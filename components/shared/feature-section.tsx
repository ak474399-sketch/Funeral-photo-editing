"use client";

import { motion } from "framer-motion";
import { Check, User, Palette, Shirt, ImageMinus } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

const FEATURES = [
  {
    key: "portrait",
    icon: User,
    beforeLabel: "Original",
    afterLabel: "Formal Portrait",
  },
  {
    key: "colorize",
    icon: Palette,
    beforeLabel: "B&W Original",
    afterLabel: "Colorized",
  },
  {
    key: "attire",
    icon: Shirt,
    beforeLabel: "Casual Attire",
    afterLabel: "Formal Attire",
  },
  {
    key: "background",
    icon: ImageMinus,
    beforeLabel: "Original BG",
    afterLabel: "Clean Background",
  },
] as const;

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function FeatureSection() {
  const { t } = useLocale();

  return (
    <section className="py-16 sm:py-24 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-gold font-medium tracking-wide text-sm mb-3">
            {t("featureSection.badge")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {t("featureSection.title")}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
          {FEATURES.map(({ key, icon: Icon, beforeLabel, afterLabel }, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={key}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 sm:gap-12 lg:gap-16`}
              >
                {/* Text */}
                <div className="flex-1 space-y-5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-gold bg-gold/10 rounded-full px-4 py-1.5">
                    <Icon className="w-4 h-4" />
                    {t(`featureSection.${key}.tag`)}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {t(`featureSection.${key}.title`)}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {t(`featureSection.${key}.desc`)}
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {(["b1", "b2", "b3"] as const).map((bk) => (
                      <li key={bk} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        {t(`featureSection.${key}.${bk}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Before/After visual placeholder */}
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-lg">
                    <div className="grid grid-cols-2 relative">
                      <div className="aspect-[3/4] bg-slate-800 flex items-center justify-center">
                        <div className="text-center p-4">
                          <Icon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                          <span className="text-xs text-slate-500 block">{beforeLabel}</span>
                        </div>
                      </div>
                      <div className="aspect-[3/4] bg-slate-850 flex items-center justify-center" style={{ backgroundColor: "#1e1e1e" }}>
                        <div className="text-center p-4">
                          <Icon className="w-10 h-10 text-gold/40 mx-auto mb-2" />
                          <span className="text-xs text-gold/60 block">{afterLabel}</span>
                        </div>
                      </div>
                      <div className="absolute inset-y-0 left-1/2 w-px bg-slate-700" />
                      <span className="absolute bottom-2 left-2 text-[10px] font-medium text-slate-400 bg-slate-900/80 backdrop-blur-sm rounded px-2 py-0.5">Before</span>
                      <span className="absolute bottom-2 right-2 text-[10px] font-medium text-gold bg-slate-900/80 backdrop-blur-sm rounded px-2 py-0.5">After</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
