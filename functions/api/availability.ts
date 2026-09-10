/**
 * Cloudflare Pages Function — GET /api/availability?date=YYYY-MM-DD
 * Public endpoint used by the Petreceri/Loc de joacă forms to only show the
 * time slots still free for the chosen date. See functions/_shared/availability.ts.
 */
import { getAvailability, type AvailabilityEnv } from '../_shared/availability';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestGet: PagesFunction<AvailabilityEnv> = async ({ request, env }) => {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return jsonResponse({ success: false, message: 'Dată invalidă.' }, 400);
  }

  const slots = await getAvailability(env, date);
  return jsonResponse({ success: true, date, slots });
};
