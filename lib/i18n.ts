export const SUPPORTED_LOCALES = ["en", "ja", "zh-TW"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE_DAYS = 365;

export function getLocaleFromBrowser(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || "";
  const lower = lang.toLowerCase();
  if (lower.startsWith("ja")) return "ja";
  if (lower.startsWith("zh")) {
    if (lower.includes("tw") || lower.includes("hk") || lower === "zh-hant") return "zh-TW";
  }
  return "en";
}

export function getStoredLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  if (value && SUPPORTED_LOCALES.includes(value as Locale)) return value as Locale;
  return null;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=${60 * 60 * 24 * COOKIE_MAX_AGE_DAYS}; SameSite=Lax`;
}

export function getDefaultLocale(): Locale {
  const stored = getStoredLocale();
  if (stored) return stored;
  return getLocaleFromBrowser();
}

export function isRtl(): boolean {
  return false;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  "zh-TW": "繁體中文",
};
