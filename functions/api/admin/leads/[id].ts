/**
 * Cloudflare Pages Function — PATCH /api/admin/leads/:id
 * Updates a lead's status (nou | confirmat | anulat). Requires a valid
 * admin session cookie (see ../_auth.ts).
 */
import { isAuthenticated, type AdminEnv } from '../_auth';

interface Env extends AdminEnv {
  DB: D1Database;
}

const VALID_STATUSES = ['nou', 'confirmat', 'anulat'];

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  if (!(await isAuthenticated(request, env))) {
    return jsonResponse({ success: false, message: 'Neautorizat.' }, 401);
  }

  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return jsonResponse({ success: false, message: 'ID invalid.' }, 400);
  }

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, message: 'Cerere invalidă.' }, 400);
  }

  if (!body.status || !VALID_STATUSES.includes(body.status)) {
    return jsonResponse({ success: false, message: 'Status invalid.' }, 400);
  }

  await env.DB.prepare(`UPDATE leads SET status = ?, updated_at = datetime('now') WHERE id = ?`)
    .bind(body.status, id)
    .run();

  return jsonResponse({ success: true });
};
