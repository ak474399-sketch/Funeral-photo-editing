"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Download, X, Plus, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { UploadZone } from "@/components/editor/upload-zone";
import { FunctionSelector } from "@/components/editor/function-selector";
import { PrintSizes } from "@/components/editor/print-sizes";
import { LoginModal } from "@/components/shared/login-modal";
import type { GenType } from "@/lib/gemini";

type QueueItem = {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "processing" | "done" | "error";
  resultBase64?: string;
  resultMime?: string;
  error?: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function EditPage() {
  const { t } = useLocale();
  const { data: session, status: authStatus } = useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<GenType | null>(null);
  const [batchMode, setBatchMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFiles = useCallback((files: File[]) => {
    const items: QueueItem[] = files.map((file) => ({
      id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
      file,
      preview: URL.createObjectURL(file),
      status: "pending" as const,
    }));
    setQueue((prev) => (batchMode ? [...prev, ...items] : items));
  }, [batchMode]);

  const removeFromQueue = (id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const handleGenerate = async () => {
    if (!session) { setLoginOpen(true); return; }
    if (!selectedFunction || queue.length === 0) return;

    setIsGenerating(true);

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (item.status === "done") continue;

      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: "processing" } : q))
      );

      try {
        const base64 = await fileToBase64(item.file);
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: item.file.type || "image/jpeg",
            genType: selectedFunction,
          }),
        });

        const data = await res.json();

        if (data.success && data.imageBase64) {
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? { ...q, status: "done", resultBase64: data.imageBase64, resultMime: data.imageMimeType }
                : q
            )
          );
        } else {
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? { ...q, status: "error", error: data.error || "Failed" }
                : q
            )
          );
        }
      } catch (err) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? { ...q, status: "error", error: (err as Error).message }
              : q
          )
        );
      }
    }

    setIsGenerating(false);
  };

  const handleDownload = (item: QueueItem) => {
    if (!item.resultBase64) return;
    const link = document.createElement("a");
    link.href = `data:${item.resultMime || "image/png"};base64,${item.resultBase64}`;
    link.download = `memorial-${item.id}.${item.resultMime?.includes("png") ? "png" : "jpg"}`;
    link.click();
  };

  const doneItem = queue.find((q) => q.status === "done");

  return (
    <>
      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-8">
            {t("edit.title")}
          </h1>

          {authStatus === "unauthenticated" && (
            <div className="mb-8 p-4 rounded-xl bg-slate-900 border border-slate-700 text-center">
              <p className="text-slate-400 text-sm">{t("edit.loginRequired")}</p>
              <button type="button" onClick={() => setLoginOpen(true)} className="mt-3 text-sm font-medium text-gold hover:text-gold-light transition-colors">
                {t("nav.signIn")}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Upload + Settings */}
            <div className="space-y-6">
              <UploadZone onFiles={handleFiles} multiple={batchMode} />

              {/* Batch mode toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={batchMode} onChange={(e) => setBatchMode(e.target.checked)} className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-gold focus:ring-gold/50" />
                <span className="text-sm text-slate-400">{t("edit.batchMode")}</span>
              </label>

              {/* Queue preview */}
              {queue.length > 0 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {queue.map((item) => (
                      <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.preview} alt="" className="w-full h-full object-cover" />
                        {item.status === "processing" && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-gold" />
                          </div>
                        )}
                        {item.status === "done" && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                          </div>
                        )}
                        {item.status === "error" && (
                          <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center">
                            <X className="w-6 h-6 text-red-400" />
                          </div>
                        )}
                        <button type="button" onClick={() => removeFromQueue(item.id)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white/80 hover:text-white">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {batchMode && (
                      <button type="button" onClick={() => document.querySelector<HTMLInputElement>("input[type=file]")?.click()} className="aspect-square rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-400 hover:border-slate-500 transition-colors">
                        <Plus className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <FunctionSelector selected={selectedFunction} onSelect={setSelectedFunction} />

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !selectedFunction || queue.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-semibold py-4 rounded-xl transition-colors text-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("edit.generating")}
                  </>
                ) : (
                  <>
                    {t("edit.generate")}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Right: Results */}
            <div className="space-y-6">
              {queue.filter((q) => q.status === "done").length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-sm font-medium text-slate-400">{t("edit.result")}</h3>
                  {queue.filter((q) => q.status === "done").map((item) => (
                    <div key={item.id} className="space-y-4">
                      <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`data:${item.resultMime};base64,${item.resultBase64}`}
                          alt="Result"
                          className="w-full"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => handleDownload(item)} className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl text-sm font-medium transition-colors border border-slate-700">
                          <Download className="w-4 h-4" />
                          {t("edit.download")}
                        </button>
                      </div>
                    </div>
                  ))}
                  {doneItem?.resultBase64 && doneItem.resultMime && (
                    <PrintSizes imageBase64={doneItem.resultBase64} imageMimeType={doneItem.resultMime} />
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-500 text-sm">{t("edit.result")}</p>
                  <p className="text-slate-600 text-xs mt-1">Upload a photo and select a function to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
