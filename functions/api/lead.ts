/**
 * Cloudflare Pages Function — POST /api/lead
 *
 * Receives a submission from one of the five site forms (Petreceri, Loc de
 * joacă, Afterschool, Arena VR mobilă, Contact), does basic server-side
 * validation and spam-trapping, then fans the lead out to up to three places:
 *
 *   1. Email via Resend        — always, and the only channel that can fail the request
 *   2. Telegram                — instant push notification, if configured
 *   3. Google Calendar         — only for submissions carrying a date, if configured
 *
 * Channels 2 and 3 are best-effort: a Telegram outage or a broken calendar
 * webhook must never cost a real booking, so their failures are logged and
 * swallowed rather than surfaced to the visitor.
 *
 * Required Cloudflare Pages environment variable:
 *   RESEND_API_KEY        — API key from resend.com (Settings → API Keys)
 *
 * Optional environment variables:
 *   LEAD_NOTIFICATION_EMAIL  — where notifications are sent
 *                              (defaults to rusanadrian1973@gmail.com below)
 *   RESEND_FROM_EMAIL        — sender address (defaults to Resend's shared
 *                              onboarding@resend.dev, which works instantly
 *                              with no domain verification; once arenaplay.ro
 *                              is verified in Resend, switch this to e.g.
 *                              "Arena Play <notificari@arenaplay.ro>")
 *   TELEGRAM_BOT_TOKEN       — from @BotFather
 *   TELEGRAM_CHAT_ID         — chat or group id the bot posts into
 *   CALENDAR_WEBHOOK_URL     — Google Apps Script web-app URL
 *   CALENDAR_WEBHOOK_SECRET  — shared secret checked by that script
 *
 * Set these in the Cloudflare dashboard: Pages project → Settings →
 * Environment variables. For local testing with `wrangler pages dev`, put
 * them in a git-ignored `.dev.vars` file instead.
 */

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  LEAD_NOTIFICATION_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  CALENDAR_WEBHOOK_URL?: string;
  CALENDAR_WEBHOOK_SECRET?: string;
  /** Server-side secret for the Cloudflare Turnstile widget on the Petreceri/Loc de joacă forms. */
  TURNSTILE_SECRET_KEY?: string;
}

type LeadType = 'petreceri' | 'playground' | 'afterschool' | 'arena-mobila' | 'contact';

interface LeadRequestBody {
  type: LeadType;
  payload: Record<string, unknown>;
  /** Honeypot field — must always be empty. Bots tend to fill every field. */
  website?: string;
}

const DEFAULT_NOTIFICATION_EMAIL = 'rusanadrian1973@gmail.com';

const typeLabels: Record<LeadType, string> = {
  petreceri: 'Petreceri — cerere de rezervare',
  playground: 'Loc de joacă — cerere de rezervare',
  afterschool: 'Afterschool — solicitare de înscriere',
  'arena-mobila': 'Arena VR mobilă — solicitare de ofertă',
  contact: 'Formular de contact',
};

/** Short prefixes so a calendar month view stays readable. */
const calendarPrefixes: Record<LeadType, string> = {
  petreceri: 'Petrecere',
  playground: 'Loc de joacă',
  afterschool: 'Afterschool',
  'arena-mobila': 'Arena VR mobilă',
  contact: 'Contact',
};

const fieldLabels: Record<string, string> = {
  name: 'Nume',
  phone: 'Telefon',
  email: 'E-mail',
  preferredDate: 'Dată dorită',
  preferredTime: 'Interval orar',
  kidsCount: 'Număr de copii',
  peopleCount: 'Număr de persoane',
  packageId: 'Pachet',
  message: 'Mesaj',
  parentName: 'Nume părinte',
  childName: 'Nume copil',
  childGrade: 'Clasă',
  school: 'Școală',
  requestType: 'Tip solicitare',
  nameOrOrganization: 'Nume / Organizație',
  locality: 'Localitate',
  location: 'Locație',
  eventDate: 'Dată eveniment',
  participants: 'Participanți',
  subject: 'Subiect',
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Payload entries worth showing a human, in submission order. */
function visibleEntries(payload: Record<string, unknown>): [string, string][] {
  return Object.entries(payload)
    .filter(
      ([key, value]) =>
        key !== 'consent' &&
        key !== 'website' &&
        key !== 'turnstileToken' &&
        value !== undefined &&
        value !== ''
    )
    .map(([key, value]) => [fieldLabels[key] ?? key, String(value)]);
}

function buildEmailHtml(type: LeadType, payload: Record<string, unknown>): string {
  const rows = visibleEntries(payload)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#666;font-weight:600;">${escapeHtml(label)}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="color:#FF2E93;">${escapeHtml(typeLabels[type])}</h2>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="color:#999;font-size:12px;margin-top:24px;">Trimis automat de pe arenaplay.ro</p>
    </div>
  `;
}

/**
 * Telegram's HTML parse mode accepts a small tag subset; everything else must
 * be escaped or the whole message is rejected with a 400.
 */
function buildTelegramMessage(type: LeadType, payload: Record<string, unknown>): string {
  const lines = visibleEntries(payload)
    .map(([label, value]) => `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`)
    .join('\n');

  return `🔔 <b>${escapeHtml(typeLabels[type])}</b>\n\n${lines}`;
}

async function notifyTelegram(
  env: Env,
  type: LeadType,
  payload: Record<string, unknown>
): Promise<void> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;

  const response = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: buildTelegramMessage(type, payload),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Telegram ${response.status}: ${await response.text()}`);
  }
}

/**
 * Only submissions that actually name a day belong on a calendar. Contact and
 * Afterschool enquiries have no date, so they are intentionally skipped.
 */
function extractBookingDate(payload: Record<string, unknown>): string | null {
  const raw = payload.preferredDate ?? payload.eventDate;
  if (typeof raw !== 'string' || !raw) return null;
  // The date inputs emit ISO yyyy-mm-dd; anything else is not trustworthy.
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : null;
}

async function addCalendarEvent(
  env: Env,
  type: LeadType,
  payload: Record<string, unknown>
): Promise<void> {
  if (!env.CALENDAR_WEBHOOK_URL) return;

  const date = extractBookingDate(payload);
  if (!date) return;

  const who = [payload.name, payload.parentName, payload.nameOrOrganization].find(
    (value) => typeof value === 'string' && value
  ) as string | undefined;

  const response = await fetch(env.CALENDAR_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: env.CALENDAR_WEBHOOK_SECRET ?? '',
      title: `${calendarPrefixes[type]} — ${who ?? 'cerere nouă'}`,
      date,
      /** "11:30 – 14:30" when present; the script falls back to all-day. */
      timeRange: typeof payload.preferredTime === 'string' ? payload.preferredTime : '',
      details: visibleEntries(payload)
        .map(([label, value]) => `${label}: ${value}`)
        .join('\n'),
    }),
  });

  if (!response.ok) {
    throw new Error(`Calendar ${response.status}: ${await response.text()}`);
  }
}

/**
 * Verifies a Cloudflare Turnstile token server-side. Only enforced when
 * TURNSTILE_SECRET_KEY is configured — until the widget is set up (see
 * VITE_TURNSTILE_SITE_KEY in .env.example), submissions pass through
 * unchecked, same as the other optional channels below.
 */
async function verifyTurnstile(env: Env, token: string | undefined, ip: string | null): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success: boolean };
  return result.success === true;
}

/** Persists the raw submission so it shows up in the /admin dashboard, independent of email delivery. */
async function saveLead(env: Env, type: LeadType, payload: Record<string, unknown>): Promise<void> {
  const get = (key: string): string | null => {
    const value = payload[key];
    return typeof value === 'string' && value ? value : null;
  };

  await env.DB.prepare(
    `INSERT INTO leads (type, name, phone, email, preferred_date, preferred_time, message, payload)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      type,
      get('name') ?? get('parentName') ?? get('nameOrOrganization'),
      get('phone'),
      get('email'),
      get('preferredDate') ?? get('eventDate'),
      get('preferredTime'),
      get('message') ?? get('subject'),
      JSON.stringify(payload)
    )
    .run();
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: LeadRequestBody;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, message: 'Corp de cerere invalid.' }, 400);
  }

  // Honeypot — real users never see or fill this field.
  if (body.website) {
    return jsonResponse({ success: true, message: 'OK' });
  }

  if (!body.type || !typeLabels[body.type] || !body.payload || typeof body.payload !== 'object') {
    return jsonResponse({ success: false, message: 'Date de formular invalide.' }, 400);
  }

  const turnstileToken = body.payload.turnstileToken;
  const turnstileOk = await verifyTurnstile(
    env,
    typeof turnstileToken === 'string' ? turnstileToken : undefined,
    request.headers.get('CF-Connecting-IP')
  );
  if (!turnstileOk) {
    return jsonResponse({ success: false, message: 'Verificarea anti-spam a eșuat. Reîncearcă.' }, 403);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse(
      { success: false, message: 'Serviciul de email nu este configurat (RESEND_API_KEY lipsă).' },
      500
    );
  }

  const to = env.LEAD_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
  const from = env.RESEND_FROM_EMAIL || 'Arena Play <onboarding@resend.dev>';
  const replyTo =
    typeof body.payload.email === 'string' && body.payload.email ? body.payload.email : undefined;

  try {
    // Fire all four in parallel; only the email result gates the response.
    const [emailResult, telegramResult, calendarResult, dbResult] = await Promise.allSettled([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: typeLabels[body.type],
          html: buildEmailHtml(body.type, body.payload),
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      }),
      notifyTelegram(env, body.type, body.payload),
      addCalendarEvent(env, body.type, body.payload),
      saveLead(env, body.type, body.payload),
    ]);

    if (telegramResult.status === 'rejected') {
      console.error('Telegram notification failed:', telegramResult.reason);
    }
    if (calendarResult.status === 'rejected') {
      console.error('Calendar event failed:', calendarResult.reason);
    }
    if (dbResult.status === 'rejected') {
      console.error('Saving lead to D1 failed:', dbResult.reason);
    }

    if (emailResult.status === 'rejected') {
      console.error('Resend request failed:', emailResult.reason);
      return jsonResponse(
        { success: false, message: 'Trimiterea a eșuat. Te rugăm să ne suni direct.' },
        502
      );
    }

    if (!emailResult.value.ok) {
      console.error('Resend error:', await emailResult.value.text());
      return jsonResponse(
        { success: false, message: 'Trimiterea a eșuat. Te rugăm să ne suni direct.' },
        502
      );
    }

    return jsonResponse({ success: true, message: 'Cererea a fost trimisă cu succes.' });
  } catch (err) {
    console.error('Lead function error:', err);
    return jsonResponse({ success: false, message: 'A apărut o eroare neașteptată.' }, 500);
  }
};
