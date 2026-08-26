/**
 * Cloudflare Pages Function — POST /api/lead
 *
 * Receives a submission from one of the five site forms (Petreceri, Loc de
 * joacă, Afterschool, Arena VR mobilă, Contact), does basic server-side validation
 * and spam-trapping, then emails a formatted summary via Resend
 * (https://resend.com) to the configured notification inbox.
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
 *
 * Set these in the Cloudflare dashboard: Pages project → Settings →
 * Environment variables. For local testing with `wrangler pages dev`, put
 * them in a git-ignored `.dev.vars` file instead.
 */

interface Env {
  RESEND_API_KEY: string;
  LEAD_NOTIFICATION_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
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

function buildEmailHtml(type: LeadType, payload: Record<string, unknown>): string {
  const rows = Object.entries(payload)
    .filter(([key, value]) => key !== 'consent' && value !== undefined && value !== '')
    .map(([key, value]) => {
      const label = fieldLabels[key] ?? key;
      return `<tr><td style="padding:6px 12px;color:#666;font-weight:600;">${escapeHtml(label)}</td><td style="padding:6px 12px;">${escapeHtml(String(value))}</td></tr>`;
    })
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="color:#FF2E93;">${escapeHtml(typeLabels[type])}</h2>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="color:#999;font-size:12px;margin-top:24px;">Trimis automat de pe arenaplay.ro</p>
    </div>
  `;
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

  if (!env.RESEND_API_KEY) {
    return jsonResponse(
      { success: false, message: 'Serviciul de email nu este configurat (RESEND_API_KEY lipsă).' },
      500
    );
  }

  const to = env.LEAD_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
  const from = env.RESEND_FROM_EMAIL || 'Arena Play <onboarding@resend.dev>';
  const replyTo = typeof body.payload.email === 'string' && body.payload.email ? body.payload.email : undefined;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
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
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend error:', errorText);
      return jsonResponse({ success: false, message: 'Trimiterea a eșuat. Te rugăm să ne suni direct.' }, 502);
    }

    return jsonResponse({ success: true, message: 'Cererea a fost trimisă cu succes.' });
  } catch (err) {
    console.error('Lead function error:', err);
    return jsonResponse({ success: false, message: 'A apărut o eroare neașteptată.' }, 500);
  }
};
