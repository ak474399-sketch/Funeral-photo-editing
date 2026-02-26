"use client";

import { User, Palette, Shirt, ImageMinus, Users, FileImage } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import type { GenType } from "@/lib/gemini";

const FUNCTIONS: { key: GenType; icon: typeof User }[] = [
  { key: "portrait", icon: User },
  { key: "colorize", icon: Palette },
  { key: "attire", icon: Shirt },
  { key: "background", icon: ImageMinus },
  { key: "composite", icon: Users },
  { key: "poster", icon: FileImage },
];

type Props = {
  selected: GenType | null;
  onSelect: (genType: GenType) => void;
};

export function FunctionSelector({ selected, onSelect }: Props) {
  const { t } = useLocale();

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-400 mb-3">{t("edit.selectFunction")}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {FUNCTIONS.map(({ key, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-sm font-medium transition-all ${selected === key ? "border-gold bg-gold/10 text-gold" : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"}`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {t(`edit.${key}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
