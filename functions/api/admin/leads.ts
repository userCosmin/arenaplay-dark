/**
 * Cloudflare Pages Function — GET /api/admin/leads
 * Lists submissions stored in D1 by functions/api/lead.ts, with optional
 * filtering/search and pagination. Requires a valid admin session cookie
 * (see ./_auth.ts).
 */
import { isAuthenticated, type AdminEnv } from './_auth';

interface Env extends AdminEnv {
  DB: D1Database;
}

interface LeadRow {
  id: number;
  type: string;
  status: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  payload: string;
  created_at: string;
  updated_at: string;
}

const PAGE_SIZE = 25;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await isAuthenticated(request, env))) {
    return jsonResponse({ success: false, message: 'Neautorizat.' }, 401);
  }

  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const status = url.searchParams.get('status');
  const search = url.searchParams.get('search');
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1);

  const conditions: string[] = [];
  const params: string[] = [];

  if (type) {
    conditions.push('type = ?');
    params.push(type);
  }
  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (search) {
    conditions.push('(name LIKE ? OR phone LIKE ? OR email LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [countResult, listResult] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) as total FROM leads ${where}`)
      .bind(...params)
      .first<{ total: number }>(),
    env.DB.prepare(`SELECT * FROM leads ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
      .bind(...params, PAGE_SIZE, (page - 1) * PAGE_SIZE)
      .all<LeadRow>(),
  ]);

  return jsonResponse({
    success: true,
    total: countResult?.total ?? 0,
    page,
    pageSize: PAGE_SIZE,
    leads: listResult.results,
  });
};
