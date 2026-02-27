"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/shared/locale-provider";
import { LilyDivider } from "@/components/shared/lily-decoration";
import { User, FileImage, Share2 } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const CASES = [
  {
    id: "case-1",
    nameKey: "cases.case1.name",
    storyKey: "cases.case1.story",
    portrait: "/images/case1-portrait.jpg",
    poster: "/images/case1-poster.jpg",
    social: "/images/case1-social.jpg",
  },
  {
    id: "case-2",
    nameKey: "cases.case2.name",
    storyKey: "cases.case2.story",
    portrait: "/images/case2-portrait.jpg",
    poster: "/images/case2-poster.jpg",
    social: "/images/case2-social.jpg",
  },
  {
    id: "case-3",
    nameKey: "cases.case3.name",
    storyKey: "cases.case3.story",
    portrait: "/images/case3-portrait.jpg",
    poster: "/images/case3-poster.jpg",
    social: "/images/case3-social.jpg",
  },
];

export default function CasesPage() {
  const { t } = useLocale();

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm tracking-wide mb-3">{t("cases.badge")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {t("cases.title")}
          </h1>
          <LilyDivider className="mt-5 mb-4" />
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t("cases.subtitle")}</p>
        </div>

        {/* Case studies */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-20">
          {CASES.map((c, i) => (
            <motion.article key={c.id} variants={fadeUp} className="space-y-6">
              {/* Case header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">
                  {t("cases.caseLabel")} {i + 1}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">{t(c.nameKey)}</h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">{t(c.storyKey)}</p>

              {/* Three deliverables grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Formal portrait */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden group">
                  <div className="aspect-[3/4] bg-slate-800 flex items-center justify-center">
                    <div className="text-center p-6">
                      <User className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                      <span className="text-xs text-slate-500">{t("cases.portraitLabel")}</span>
                    </div>
                  </div>
                  <div className="p-3 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs font-medium text-slate-300">{t("cases.portraitLabel")}</span>
                    </div>
                  </div>
                </div>

                {/* Memorial poster */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden group">
                  <div className="aspect-[3/4] bg-slate-800 flex items-center justify-center">
                    <div className="text-center p-6">
                      <FileImage className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                      <span className="text-xs text-slate-500">{t("cases.posterLabel")}</span>
                    </div>
                  </div>
                  <div className="p-3 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <FileImage className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs font-medium text-slate-300">{t("cases.posterLabel")}</span>
                    </div>
                  </div>
                </div>

                {/* Social share */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden group">
                  <div className="aspect-[3/4] bg-slate-800 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Share2 className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                      <span className="text-xs text-slate-500">{t("cases.socialLabel")}</span>
                    </div>
                  </div>
                  <div className="p-3 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs font-medium text-slate-300">{t("cases.socialLabel")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {i < CASES.length - 1 && (
                <div className="pt-8">
                  <LilyDivider />
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <LilyDivider className="mb-8" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">{t("cases.ctaTitle")}</h2>
          <Link href="/edit" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20 text-lg">
            {t("cases.ctaButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}
