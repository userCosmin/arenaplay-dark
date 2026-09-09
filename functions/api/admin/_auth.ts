/**
 * Shared auth helpers for the /api/admin/* Cloudflare Pages Functions.
 * Not a route itself — files/folders prefixed with `_` are excluded from
 * Pages Functions routing, but can still be imported by sibling routes.
 *
 * Session model: a single shared admin password (ADMIN_PASSWORD) gates
 * login. On success we hand back a cookie of the form
 * `<expiryUnixSeconds>.<hmacSignature>`, HMAC-signed with
 * ADMIN_SESSION_SECRET so it can't be forged or extended client-side.
 * There is no server-side session store — verification just re-computes
 * the HMAC and checks the expiry.
 *
 * Required Cloudflare Pages environment variables (Settings → Environment
 * variables, or `.dev.vars` for local `wrangler pages dev`):
 *   ADMIN_PASSWORD         — the shared admin password
 *   ADMIN_SESSION_SECRET   — random long string used to sign session cookies
 */

export interface AdminEnv {
  ADMIN_PASSWORD: string;
  ADMIN_SESSION_SECRET: string;
}

const COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12h

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Constant-time string comparison — avoids leaking password/signature length via timing. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyPassword(env: AdminEnv, password: string): boolean {
  if (!env.ADMIN_PASSWORD) return false;
  return timingSafeEqual(password, env.ADMIN_PASSWORD);
}

export async function createSessionCookie(env: AdminEnv): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const signature = await hmac(env.ADMIN_SESSION_SECRET, String(expires));
  return `${COOKIE_NAME}=${expires}.${signature}; HttpOnly; Secure; SameSite=Strict; Path=/api/admin; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/api/admin; Max-Age=0`;
}

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  return Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [key, ...rest] = part.split('=');
        return [key, rest.join('=')];
      })
  );
}

export async function isAuthenticated(request: Request, env: AdminEnv): Promise<boolean> {
  if (!env.ADMIN_SESSION_SECRET) return false;

  const cookies = parseCookies(request.headers.get('Cookie'));
  const raw = cookies[COOKIE_NAME];
  if (!raw) return false;

  const [expiresStr, signature] = raw.split('.');
  if (!expiresStr || !signature) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) return false;

  const expected = await hmac(env.ADMIN_SESSION_SECRET, expiresStr);
  return timingSafeEqual(signature, expected);
}
