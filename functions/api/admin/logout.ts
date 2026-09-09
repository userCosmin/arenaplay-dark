/** Cloudflare Pages Function — POST /api/admin/logout */
import { clearSessionCookie } from './_auth';

export const onRequestPost: PagesFunction = async () => {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Set-Cookie': clearSessionCookie() },
  });
};
