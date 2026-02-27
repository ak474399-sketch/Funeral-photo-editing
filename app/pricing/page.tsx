"use client";

import Link from "next/link";
import { Check, ArrowRight, Shield, Star, Crown } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import type { PlanTier } from "@/lib/polar";
import { LilyDivider } from "@/components/shared/lily-decoration";

type PlanConfig = {
  tier: PlanTier;
  icon: typeof Shield;
  features: string[];
  recommended?: boolean;
};

const plans: PlanConfig[] = [
  { tier: "basic", icon: Shield, features: ["f1", "f2", "f3", "f4", "f5"] },
  { tier: "bundle", icon: Star, features: ["f1", "f2", "f3", "f4", "f5", "f6"], recommended: true },
  { tier: "legacy", icon: Crown, features: ["f1", "f2", "f3", "f4"] },
];

export default function PricingPage() {
  const { t } = useLocale();
  const tierToStudioPath: Record<PlanTier, string> = {
    basic: "/studio/basic",
    bundle: "/studio/bundle",
    legacy: "/studio/legacy",
  };

  return (
    <>
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t("pricing.title")}
            </h1>
            <LilyDivider className="mt-5 mb-4" />
            <p className="mt-4 text-stone-400 text-lg max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
          </div>

          {/* Plans grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 max-w-6xl mx-auto items-start">
            {plans.map(({ tier, icon: Icon, features, recommended }) => (
              <div
                key={tier}
                className={`relative rounded-2xl border transition-all ${
                  recommended
                    ? "border-amber-500/50 bg-slate-900 shadow-xl shadow-amber-900/10 lg:scale-[1.04] ring-1 ring-amber-500/20 z-10"
                    : "border-slate-800 bg-slate-950/80"
                }`}
              >
                {/* Best Value badge */}
                {recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 text-xs font-bold rounded-full shadow-lg shadow-amber-500/20 tracking-wide">
                    {t("pricing.bestValue")}
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {/* Icon + tier name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${recommended ? "bg-amber-500/15" : "bg-slate-800"}`}>
                      <Icon className={`w-5 h-5 ${recommended ? "text-amber-400" : "text-stone-400"}`} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">{t(`pricing.${tier}.name`)}</h3>
                    </div>
                  </div>

                  {/* Headline */}
                  <p className={`text-sm font-medium mb-5 ${recommended ? "text-amber-400/80" : "text-stone-500"}`}>
                    {t(`pricing.${tier}.headline`)}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-4xl font-bold ${recommended ? "text-amber-400" : "text-white"}`}>
                      {t(`pricing.${tier}.price`)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mb-6">{t(`pricing.${tier}.desc`)}</p>

                  {/* Divider */}
                  <div className={`h-px mb-6 ${recommended ? "bg-amber-500/20" : "bg-slate-800"}`} />

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8">
                    {features.map((fk) => (
                      <li key={fk} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${recommended ? "text-amber-400" : "text-gold"}`} />
                        <span className="text-stone-300">{t(`pricing.${tier}.${fk}`)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <Link
                    href={tierToStudioPath[tier]}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                      recommended
                        ? "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/15"
                        : "border border-slate-700 hover:border-amber-500/40 text-stone-300 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    选择该套餐并上传素材
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee bar */}
          <div className="mt-12 text-center">
            <p className="inline-flex items-center gap-2 text-sm text-stone-500">
              <Shield className="w-4 h-4 text-amber-500/60" />
              {t("pricing.guarantee")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
