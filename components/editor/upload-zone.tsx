"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, ImagePlus } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

type Props = {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
};

export function UploadZone({ onFiles, multiple = false }: Props) {
  const { t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length > 0) onFiles(files);
  }, [onFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) onFiles(files);
    e.target.value = "";
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${dragging ? "border-gold bg-gold/5" : "border-slate-700 hover:border-slate-500 bg-slate-900/40"}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input ref={inputRef} type="file" accept="image/*" multiple={multiple} className="hidden" onChange={handleChange} />
      <div className="flex flex-col items-center gap-4">
        {dragging ? (
          <ImagePlus className="w-12 h-12 text-gold" />
        ) : (
          <Upload className="w-12 h-12 text-slate-500" />
        )}
        <p className="text-lg font-medium text-white">{t("edit.upload")}</p>
        <p className="text-sm text-slate-500">{t("edit.uploadHint")}</p>
      </div>
    </div>
  );
}
