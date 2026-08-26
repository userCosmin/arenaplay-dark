import { siteConfig } from '@/config/site.config';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Thin fetch wrapper prepared for future backend integration.
 * When `VITE_API_BASE_URL` is not set, callers should use the mocked
 * functions in `bookingService.ts` instead of calling this directly.
 */
export async function apiPost<TPayload, TResponse = unknown>(
  path: string,
  payload: TPayload
): Promise<ApiResponse<TResponse>> {
  const baseUrl = siteConfig.api.baseUrl;

  if (!baseUrl) {
    throw new Error('API base URL not configured — use the mocked services during development.');
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as ApiResponse<TResponse>;
}

/**
 * Posts to the Cloudflare Pages Function at /api/lead (see functions/api/lead.ts),
 * which relays the submission to the configured notification inbox via Resend.
 * Relative path — works automatically on the same domain in every deployment
 * (production and preview), no VITE_API_BASE_URL needed.
 */
export async function postLead(
  type: 'petreceri' | 'playground' | 'afterschool' | 'arena-mobila' | 'contact',
  payload: Record<string, unknown>
): Promise<ApiResponse> {
  const { website, ...rest } = payload;

  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, payload: rest, website }),
  });

  const data = (await response.json().catch(() => null)) as ApiResponse | null;

  if (!response.ok || !data) {
    throw new Error(data?.message ?? `Request failed with status ${response.status}`);
  }

  return data;
}
