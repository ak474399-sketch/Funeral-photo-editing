"use client";

import Link from "next/link";
import { useLocale } from "@/components/shared/locale-provider";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-serif text-lg font-semibold text-white">{t("footer.brand")}</p>
            <p className="text-sm text-slate-500 mt-1">{t("footer.tagline")}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/terms" className="hover:text-white transition-colors">{t("footer.terms")}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-600 text-center">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
