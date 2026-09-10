/**
 * Cloudflare Pages Function — /api/admin/blocks
 * GET  — lists blocked dates/slots ("Vezi date blocate").
 * POST — creates one or more blocks ("Blochează date și ore"): whole day or
 *        specific slot(s), across one or more dates, optionally recurring
 *        weekly. Requires a valid admin session (see ../_auth.ts).
 */
import { isAuthenticated, type AdminEnv } from './_auth';
import { RESERVATION_SLOTS } from '../../_shared/availability';

interface Env extends AdminEnv {
  DB: D1Database;
}

interface BlockRow {
  id: number;
  date: string;
  time: string | null;
  recurring: number;
  reason: string | null;
  created_at: string;
}

interface CreateBlockBody {
  dates?: string[];
  /** Slot ids to block, or omit/empty for the whole day. */
  times?: string[];
  recurring?: boolean;
  reason?: string;
}

const SLOT_IDS: Set<string> = new Set(RESERVATION_SLOTS.map((s) => s.id));

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await isAuthenticated(request, env))) {
    return jsonResponse({ success: false, message: 'Neautorizat.' }, 401);
  }

  const result = await env.DB.prepare(`SELECT * FROM blocked_slots ORDER BY date DESC, id DESC`).all<BlockRow>();
  return jsonResponse({ success: true, blocks: result.results });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await isAuthenticated(request, env))) {
    return jsonResponse({ success: false, message: 'Neautorizat.' }, 401);
  }

  let body: CreateBlockBody;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, message: 'Cerere invalidă.' }, 400);
  }

  const dates = (body.dates ?? []).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d));
  if (dates.length === 0) {
    return jsonResponse({ success: false, message: 'Alege cel puțin o dată validă.' }, 400);
  }

  const times = (body.times ?? []).filter((t) => SLOT_IDS.has(t));
  if ((body.times ?? []).length > 0 && times.length === 0) {
    return jsonResponse({ success: false, message: 'Interval orar invalid.' }, 400);
  }

  const reason = (body.reason ?? '').trim();
  if (!reason) {
    return jsonResponse({ success: false, message: 'Motivul este obligatoriu.' }, 400);
  }

  const recurring = body.recurring === true ? 1 : 0;
  const timeValues: (string | null)[] = times.length > 0 ? times : [null];

  const writes = [];
  for (const date of dates) {
    for (const time of timeValues) {
      writes.push(
        env.DB.prepare(`INSERT INTO blocked_slots (date, time, recurring, reason) VALUES (?, ?, ?, ?)`).bind(
          date,
          time,
          recurring,
          reason
        )
      );
    }
  }
  await env.DB.batch(writes);

  return jsonResponse({ success: true });
};
