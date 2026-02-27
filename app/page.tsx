"use client";

import { useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLocale } from "@/components/shared/locale-provider";
import { LilyLeft, LilyRight, LilyDivider } from "@/components/shared/lily-decoration";
import {
  User,
  Palette,
  Shirt,
  ImageMinus,
  Users,
  FileImage,
  ArrowRight,
  Check,
  Upload,
  Shield,
  Star,
  Crown,
} from "lucide-react";

const FeatureSection = dynamic(() => import("@/components/shared/feature-section"), { ssr: false });
const ReviewsCarousel = dynamic(() => import("@/components/shared/reviews-carousel").then((m) => ({ default: m.ReviewsCarousel })), { ssr: false });
const ToolsSection = dynamic(() => import("@/components/shared/tools-section").then((m) => ({ default: m.ToolsSection })), { ssr: false });
const FaqSection = dynamic(() => import("@/components/shared/faq-section").then((m) => ({ default: m.FaqSection })), { ssr: false });

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

  const handleUploadClick = useCallback(() => {
    window.location.href = "/pricing";
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950" />

        {/* Candlelight glow orbs */}
        <div className="candle-orb candle-orb-gold animate-candle-glow w-[300px] h-[300px] -top-20 left-1/4 sm:w-[400px] sm:h-[400px]" />
        <div className="candle-orb candle-orb-warm animate-candle-glow-slow w-[250px] h-[250px] top-20 right-1/4 sm:w-[350px] sm:h-[350px]" />
        <div className="candle-orb candle-orb-gold animate-candle-glow-slow w-[200px] h-[200px] bottom-10 left-1/3" />

        {/* Lily decorations */}
        <LilyLeft className="absolute left-2 sm:left-8 top-10 w-16 sm:w-24 text-white/60 hidden md:block" />
        <LilyRight className="absolute right-2 sm:right-8 top-10 w-16 sm:w-24 text-white/60 hidden md:block" />

        <div className="container relative mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
            {/* Badge — emotion first */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/8 border border-gold/15 text-gold/80 text-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t("home.hero.badge")}
            </motion.div>

            {/* Main headline — emotional, no tech jargon */}
            <motion.h1 variants={fadeUp} className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] max-w-5xl mx-auto tracking-tight">
              {t("home.hero.title")}
            </motion.h1>

            <motion.div variants={fadeUp}>
              <LilyDivider className="my-6 sm:my-8" />
            </motion.div>

            <motion.p variants={fadeUp} className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t("home.hero.subtitle")}
            </motion.p>
          </motion.div>

          {/* ── Restoration Module: Video left / Upload right ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          >
            {/* Video side */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 aspect-[4/3] lg:aspect-auto group">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/hero-poster.png"
                className="w-full h-full object-cover"
              >
                <source src="/videos/demo.mp4" type="video/mp4" />
              </video>
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              {/* Corner lilies on video */}
              <div className="absolute bottom-4 left-4 opacity-30">
                <svg viewBox="0 0 50 50" className="w-8 h-8 text-white" fill="none" aria-hidden="true">
                  <path d="M25 45 C25 35, 23 25, 24 15 C24.5 10, 25.5 10, 26 15 C27 25, 25 35, 25 45Z" fill="currentColor" opacity="0.5" />
                  <path d="M24 15 C18 10, 10 9, 7 5 C10 7, 18 8, 24 15Z" fill="currentColor" opacity="0.4" />
                  <path d="M26 15 C32 10, 40 9, 43 5 C40 7, 32 8, 26 15Z" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Upload side */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700/80 bg-slate-900/30 p-8 sm:p-10 hover:border-gold/30 hover:bg-slate-900/50 transition-all duration-500 cursor-pointer group"
              onClick={handleUploadClick}
            >
              {/* Candle glow behind upload icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 w-24 h-24 -translate-x-2 -translate-y-2 rounded-full bg-gold/10 animate-candle-glow blur-xl" />
                <div className="relative w-20 h-20 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                  <Upload className="w-9 h-9 text-gold" />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 text-center">
                {t("home.hero.uploadTitle")}
              </h3>
              <p className="text-sm text-slate-500 mb-6 text-center max-w-xs">
                {t("home.hero.uploadHint")}
              </p>

              <button type="button" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20">
                {t("home.hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="mt-4 text-xs text-slate-600 flex items-center gap-1.5">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4zm.75 7a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
                {t("home.hero.privacyNote")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURES GRID ═══════════ */}
      <section className="relative py-20 sm:py-28 bg-slate-900/50">
        {/* Subtle lily corners */}
        <LilyLeft className="absolute left-0 bottom-0 w-20 text-slate-400/20 hidden lg:block" />
        <LilyRight className="absolute right-0 bottom-0 w-20 text-slate-400/20 hidden lg:block" />

        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {t("home.features.title")}
            </motion.h2>
            <motion.div variants={fadeUp}>
              <LilyDivider className="mt-4 mb-3" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              {t("home.features.subtitle")}
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ key, icon: Icon }) => (
              <motion.div key={key} variants={fadeUp} className="group p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-gold/30 hover:bg-slate-900 transition-all duration-300 relative overflow-hidden">
                {/* Subtle glow on hover */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-2">
                    {t(`home.feature.${key}.title`)}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(`home.feature.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURE BEFORE/AFTER ═══════════ */}
      <FeatureSection />

      {/* ═══════════ TOOLS GRID ═══════════ */}
      <ToolsSection />

      {/* ═══════════ REVIEWS ═══════════ */}
      <ReviewsCarousel />

      {/* ═══════════ PRICING PREVIEW ═══════════ */}
      <section className="relative py-20 sm:py-28">
        <LilyLeft className="absolute left-4 top-20 w-16 text-slate-500/10 hidden lg:block" />
        <LilyRight className="absolute right-4 top-20 w-16 text-slate-500/10 hidden lg:block" />

        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {t("home.pricing.title")}
            </motion.h2>
            <motion.div variants={fadeUp}>
              <LilyDivider className="mt-4 mb-3" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-stone-400 text-lg">
              {t("home.pricing.subtitle")}
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto items-start">
            {([
              { tier: "basic" as const, icon: Shield, features: ["f1", "f2", "f3", "f4", "f5"] },
              { tier: "bundle" as const, icon: Star, features: ["f1", "f2", "f3", "f4", "f5", "f6"], recommended: true },
              { tier: "legacy" as const, icon: Crown, features: ["f1", "f2", "f3", "f4"] },
            ]).map(({ tier, icon: Icon, features, recommended }) => (
              <motion.div
                key={tier}
                variants={fadeUp}
                className={`relative rounded-2xl border transition-all ${
                  recommended
                    ? "border-amber-500/50 bg-slate-900 shadow-xl shadow-amber-900/10 md:scale-[1.03] ring-1 ring-amber-500/20"
                    : "border-slate-800 bg-slate-950/80"
                }`}
              >
                {recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 text-xs font-bold rounded-full shadow-lg shadow-amber-500/20 tracking-wide">
                    {t("pricing.bestValue")}
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${recommended ? "bg-amber-500/15" : "bg-slate-800"}`}>
                      <Icon className={`w-4.5 h-4.5 ${recommended ? "text-amber-400" : "text-stone-400"}`} />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">{t(`pricing.${tier}.name`)}</h3>
                  </div>
                  <p className={`text-xs font-medium mb-4 ${recommended ? "text-amber-400/80" : "text-stone-500"}`}>{t(`pricing.${tier}.headline`)}</p>
                  <p className={`text-3xl font-bold mb-1 ${recommended ? "text-amber-400" : "text-white"}`}>{t(`pricing.${tier}.price`)}</p>
                  <p className="text-xs text-stone-600 mb-5">{t(`pricing.${tier}.desc`)}</p>
                  <div className={`h-px mb-5 ${recommended ? "bg-amber-500/20" : "bg-slate-800"}`} />
                  <ul className="space-y-3 mb-6">
                    {features.slice(0, 4).map((fk) => (
                      <li key={fk} className="flex items-start gap-2 text-sm text-stone-300">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${recommended ? "text-amber-400" : "text-gold"}`} />
                        {t(`pricing.${tier}.${fk}`)}
                      </li>
                    ))}
                    {features.length > 4 && (
                      <li className="text-xs text-stone-500 pl-6">+ {features.length - 4} more...</li>
                    )}
                  </ul>
                  <Link
                    href="/pricing"
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                      recommended
                        ? "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/15"
                        : "border border-slate-700 hover:border-amber-500/40 text-stone-300 hover:text-white"
                    }`}
                  >
                    {t("pricing.buy")}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 text-center">
            <p className="inline-flex items-center gap-2 text-sm text-stone-500">
              <Shield className="w-4 h-4 text-amber-500/60" />
              {t("pricing.guarantee")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <FaqSection />

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-slate-900/50 to-slate-950 overflow-hidden">
        {/* Candlelight glow */}
        <div className="candle-orb candle-orb-gold animate-candle-glow-slow w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="container relative mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <LilyDivider className="mb-8" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
              {t("home.cta.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
              {t("home.cta.subtitle")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20 text-lg">
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
