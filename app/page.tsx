"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/components/shared/locale-provider";
import {
  User,
  Palette,
  Shirt,
  ImageMinus,
  Users,
  FileImage,
  ArrowRight,
  Check,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const features = [
  { key: "portrait", icon: User },
  { key: "colorize", icon: Palette },
  { key: "attire", icon: Shirt },
  { key: "background", icon: ImageMinus },
  { key: "composite", icon: Users },
  { key: "poster", icon: FileImage },
];

export default function HomePage() {
  const { t } = useLocale();

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container relative mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              AI-Powered Memorial Photo Services
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
              {t("home.hero.title")}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t("home.hero.subtitle")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/edit" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20 text-lg">
                {t("home.hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl transition-colors text-lg">
                {t("home.pricing.title")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {t("home.features.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
              {t("home.features.subtitle")}
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ key, icon: Icon }) => (
              <motion.div key={key} variants={fadeUp} className="group p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-gold/30 hover:bg-slate-900 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-2">
                  {t(`home.feature.${key}.title`)}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t(`home.feature.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {t("home.pricing.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-slate-400 text-lg">
              {t("home.pricing.subtitle")}
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(["basic", "standard", "premium"] as const).map((tier) => {
              const isPopular = tier === "standard";
              return (
                <motion.div key={tier} variants={fadeUp} className={`relative p-6 sm:p-8 rounded-2xl border transition-all ${isPopular ? "border-gold/50 bg-slate-900 shadow-lg shadow-gold/5 scale-[1.02]" : "border-slate-800 bg-slate-900/40"}`}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-slate-950 text-xs font-bold rounded-full">
                      {t("pricing.popular")}
                    </div>
                  )}
                  <h3 className="font-serif text-xl font-bold text-white">{t(`pricing.${tier}.name`)}</h3>
                  <p className="text-3xl font-bold text-gold mt-3">{t(`pricing.${tier}.price`)}</p>
                  <p className="text-sm text-slate-500 mt-1">{t(`pricing.${tier}.desc`)}</p>
                  <ul className="mt-6 space-y-3">
                    {(tier === "basic" ? ["f1", "f2"] : tier === "standard" ? ["f1", "f2", "f3"] : ["f1", "f2", "f3", "f4"]).map((fk) => (
                      <li key={fk} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        {t(`pricing.${tier}.${fk}`)}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pricing" className={`mt-8 block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${isPopular ? "bg-gold hover:bg-gold-light text-slate-950" : "border border-slate-700 hover:border-gold/50 text-slate-300 hover:text-white"}`}>
                    {t("pricing.buy")}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
              {t("home.cta.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
              {t("home.cta.subtitle")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link href="/edit" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20 text-lg">
                {t("home.cta.button")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
