/**
 * Cloudflare Pages Function — DELETE /api/admin/blocks/:id
 * Removes one blocked date/slot. Requires a valid admin session.
 */
import { isAuthenticated, type AdminEnv } from '../_auth';

interface Env extends AdminEnv {
  DB: D1Database;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  if (!(await isAuthenticated(request, env))) {
    return jsonResponse({ success: false, message: 'Neautorizat.' }, 401);
  }

  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return jsonResponse({ success: false, message: 'ID invalid.' }, 400);
  }

  await env.DB.prepare(`DELETE FROM blocked_slots WHERE id = ?`).bind(id).run();
  return jsonResponse({ success: true });
};
