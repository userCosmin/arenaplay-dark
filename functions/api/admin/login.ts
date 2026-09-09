/**
 * Cloudflare Pages Function — POST /api/admin/login
 * See ./_auth.ts for the session/cookie model and required env vars.
 */
import { verifyPassword, createSessionCookie, type AdminEnv } from './_auth';

function jsonResponse(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

export const onRequestPost: PagesFunction<AdminEnv> = async ({ request, env }) => {
  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) {
    return jsonResponse(
      { success: false, message: 'Panoul de admin nu este configurat pe server.' },
      500
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, message: 'Cerere invalidă.' }, 400);
  }

  if (!body.password || !verifyPassword(env, body.password)) {
    return jsonResponse({ success: false, message: 'Parolă incorectă.' }, 401);
  }

  const cookie = await createSessionCookie(env);
  return jsonResponse({ success: true }, 200, { 'Set-Cookie': cookie });
};
