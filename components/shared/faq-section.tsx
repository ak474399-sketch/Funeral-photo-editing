"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { LilyDivider } from "@/components/shared/lily-decoration";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export function FaqSection() {
  const { t } = useLocale();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {t("faq.title")}
          </h2>
          <LilyDivider className="mt-4 mb-3" />
          <p className="text-slate-400">{t("faq.subtitle")}</p>
        </div>

        <div className="space-y-3">
          {FAQ_KEYS.map((key) => {
            const isOpen = open === key;
            return (
              <div key={key} className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-900/60 transition-colors"
                >
                  <span className="text-sm font-medium text-white">{t(`faq.${key}.q`)}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                    {t(`faq.${key}.a`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
