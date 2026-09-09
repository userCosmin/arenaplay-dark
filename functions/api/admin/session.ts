/** Cloudflare Pages Function — GET /api/admin/session (used by the admin SPA to check login state) */
import { isAuthenticated, type AdminEnv } from './_auth';

export const onRequestGet: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const authenticated = await isAuthenticated(request, env);
  return new Response(JSON.stringify({ authenticated }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
