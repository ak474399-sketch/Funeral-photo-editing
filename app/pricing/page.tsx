"use client";

import { useSession } from "next-auth/react";
import { Check, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { POLAR_PRODUCT_IDS } from "@/lib/polar";
import { getCheckoutUrl } from "@/lib/polar";
import { useState } from "react";
import { LoginModal } from "@/components/shared/login-modal";

const plans = [
  { tier: "basic" as const, features: ["f1", "f2"] },
  { tier: "standard" as const, features: ["f1", "f2", "f3"] },
  { tier: "premium" as const, features: ["f1", "f2", "f3", "f4"] },
] as const;

export default function PricingPage() {
  const { t } = useLocale();
  const { data: session } = useSession();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleBuy = (tier: keyof typeof POLAR_PRODUCT_IDS) => {
    if (!session) {
      setLoginOpen(true);
      return;
    }
    const productId = POLAR_PRODUCT_IDS[tier];
    const url = getCheckoutUrl(productId, {
      customerEmail: session.user.email ?? undefined,
      customerExternalId: session.user.id,
    });
    window.location.href = url;
  };

  return (
    <>
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t("pricing.title")}
            </h1>
            <p className="mt-4 text-slate-400 text-lg">{t("pricing.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map(({ tier, features }) => {
              const isPopular = tier === "standard";
              return (
                <div key={tier} className={`relative p-6 sm:p-8 rounded-2xl border transition-all ${isPopular ? "border-gold/50 bg-slate-900 shadow-lg shadow-gold/5 md:scale-[1.03]" : "border-slate-800 bg-slate-900/40"}`}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-slate-950 text-xs font-bold rounded-full">
                      {t("pricing.popular")}
                    </div>
                  )}
                  <h3 className="font-serif text-xl font-bold text-white">{t(`pricing.${tier}.name`)}</h3>
                  <p className="text-4xl font-bold text-gold mt-4">{t(`pricing.${tier}.price`)}</p>
                  <p className="text-sm text-slate-500 mt-2">{t(`pricing.${tier}.desc`)}</p>
                  <ul className="mt-8 space-y-3">
                    {features.map((fk) => (
                      <li key={fk} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        {t(`pricing.${tier}.${fk}`)}
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => handleBuy(tier)} className={`mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-colors ${isPopular ? "bg-gold hover:bg-gold-light text-slate-950" : "border border-slate-700 hover:border-gold/50 text-slate-300 hover:text-white"}`}>
                    {t("pricing.buy")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
