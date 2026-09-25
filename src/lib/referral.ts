/**
 * Referral cookie capture utility.
 *
 * When a user arrives at /verify?id=...&ref={chat_id}, we store two cookies
 * so the Chrome extension can pick them up during registration:
 *   ec_ref    — sanitized Telegram chat_id (digits only, max 20 chars)
 *   ec_ref_ts — Unix timestamp (seconds) of the click
 *
 * Both cookies share the same 30-day Max-Age and are set on the eyecard.ru
 * domain so the extension can read them via chrome.cookies.getAll.
 */

export function captureReferralCookie(refParam: string | null): void {
  // SSR guard + null/empty guard
  if (!refParam || typeof window === "undefined") return;

  // Validation: digits only (Telegram chat_id), max 20 characters
  const chatId = refParam.replace(/[^0-9]/g, "").slice(0, 20);
  if (!chatId) return;

  const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds = 2 592 000
  const timestamp = Math.floor(Date.now() / 1000);

  // Set BOTH cookies simultaneously with identical attributes
  const attrs = `path=/; max-age=${maxAge}; domain=eyecard.ru; SameSite=Lax; Secure`;
  document.cookie = `ec_ref=${chatId}; ${attrs}`;
  document.cookie = `ec_ref_ts=${timestamp}; ${attrs}`;
}
