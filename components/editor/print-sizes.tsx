"use client";

import { Printer } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

const SIZES = [
  { label: "1\u5bf8 (25×35mm)", w: 295, h: 413 },
  { label: "2\u5bf8 (35×49mm)", w: 413, h: 579 },
  { label: "A4 (210×297mm)", w: 2480, h: 3508 },
  { label: "A3 (297×420mm)", w: 3508, h: 4961 },
];

type Props = {
  imageBase64: string;
  imageMimeType: string;
};

export function PrintSizes({ imageBase64, imageMimeType }: Props) {
  const { t } = useLocale();

  const handleDownload = (label: string) => {
    const link = document.createElement("a");
    link.href = `data:${imageMimeType};base64,${imageBase64}`;
    link.download = `memorial-photo-${label.replace(/[^a-zA-Z0-9]/g, "_")}.${imageMimeType.includes("png") ? "png" : "jpg"}`;
    link.click();
  };

  return (
    <div>
      <h4 className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-3">
        <Printer className="w-4 h-4" />
        {t("edit.printSizes")}
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {SIZES.map((size) => (
          <button
            key={size.label}
            type="button"
            onClick={() => handleDownload(size.label)}
            className="text-left p-3 rounded-lg border border-slate-700 hover:border-gold/50 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <span className="block font-medium">{size.label}</span>
            <span className="text-slate-500">{size.w}×{size.h}px</span>
          </button>
        ))}
      </div>
    </div>
  );
}
