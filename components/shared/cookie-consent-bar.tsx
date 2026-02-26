"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/components/shared/locale-provider";

const STORAGE_KEY = "cookie_consent_accepted";

export function CookieConsentBar() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, "true"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 py-4 bg-slate-900 text-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border-t border-slate-800" role="dialog">
      <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm">{t("cookieConsent.message")}{" "}
          <Link href="/privacy" className="text-gold hover:underline">{t("cookieConsent.learnMore")}</Link>
        </p>
        <button type="button" onClick={accept} className="rounded-lg bg-gold hover:bg-gold-light text-slate-950 px-5 py-2 text-sm font-semibold transition-colors shrink-0">
          {t("cookieConsent.accept")}
        </button>
      </div>
    </div>
  );
}
