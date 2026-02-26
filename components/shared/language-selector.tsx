"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { SUPPORTED_LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-800" aria-label="Select language">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-xl py-1 min-w-[140px] z-50">
          {SUPPORTED_LOCALES.map((l) => (
            <button key={l} type="button" onClick={() => { setLocale(l as Locale); setOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${l === locale ? "text-gold bg-slate-800" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
              {LOCALE_LABELS[l as Locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
