"use client";

import Link from "next/link";
import { User, Palette, Shirt, ImageMinus, Users, FileImage, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

const TOOLS = [
  { key: "portrait", icon: User, href: "/edit" },
  { key: "colorize", icon: Palette, href: "/edit" },
  { key: "attire", icon: Shirt, href: "/edit" },
  { key: "background", icon: ImageMinus, href: "/edit" },
  { key: "composite", icon: Users, href: "/edit" },
  { key: "poster", icon: FileImage, href: "/edit" },
] as const;

export function ToolsSection() {
  const { t } = useLocale();

  return (
    <section className="py-16 sm:py-24 border-t border-slate-800 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {t("toolsSection.title")}
          </h2>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            {t("toolsSection.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {TOOLS.map(({ key, icon: Icon, href }) => (
            <Link
              key={key}
              href={href}
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:border-gold/30 hover:bg-slate-900 transition-all duration-300"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-white group-hover:text-gold transition-colors">
                      {t(`toolsSection.tools.${key}.title`)}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {t(`toolsSection.tools.${key}.desc`)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-gold shrink-0 mt-1 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
