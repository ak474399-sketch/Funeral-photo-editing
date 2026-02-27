"use client";

import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowRight, CheckCircle2, Download, Loader2, Shield, Sparkles, UploadCloud } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { UploadZone } from "@/components/editor/upload-zone";
import { LoginModal } from "@/components/shared/login-modal";
import type { GenType } from "@/lib/gemini";

type PackageType = "basic" | "bundle";
type ScanResult = {
  width: number;
  height: number;
  sizeMB: number;
  status: "good" | "warn";
  noteKeys: string[];
};
type DeliveryAsset = {
  id: string;
  labelKey: "portrait" | "poster" | "card";
  genType: GenType;
  status: "pending" | "processing" | "done" | "error";
  resultBase64?: string;
  resultMime?: string;
  error?: string;
};

const steps = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] as const;

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

function scanImage(file: File): Promise<ScanResult> {
  return new Promise((resolve) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      const sizeMB = Number((file.size / (1024 * 1024)).toFixed(2));
      const noteKeys: string[] = [];
      let status: "good" | "warn" = "good";

      if (width < 900 || height < 900) {
        status = "warn";
        noteKeys.push("scanResolutionLow");
      } else {
        noteKeys.push("scanResolutionGood");
      }

      if (sizeMB > 8) {
        status = "warn";
        noteKeys.push("scanFileLarge");
      } else {
        noteKeys.push("scanFileGood");
      }

      if (Math.min(width, height) / Math.max(width, height) < 0.55) {
        status = "warn";
        noteKeys.push("scanRatioWarn");
      } else {
        noteKeys.push("scanRatioGood");
      }

      URL.revokeObjectURL(url);
      resolve({ width, height, sizeMB, status, noteKeys });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: 0,
        height: 0,
        sizeMB: Number((file.size / (1024 * 1024)).toFixed(2)),
        status: "warn",
        noteKeys: ["scanFailed"],
      });
    };
    image.src = url;
  });
}

export default function EditPage() {
  const { t } = useLocale();
  const { data: session, status: authStatus } = useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [packageType, setPackageType] = useState<PackageType>("bundle");
  const [isGenerating, setIsGenerating] = useState(false);
  const [assets, setAssets] = useState<DeliveryAsset[]>([]);

  const packageAssets = useMemo<DeliveryAsset[]>(() => {
    if (packageType === "basic") {
      return [{ id: "portrait", labelKey: "portrait", genType: "portrait", status: "pending" }];
    }
    return [
      { id: "portrait", labelKey: "portrait", genType: "portrait", status: "pending" },
      { id: "poster", labelKey: "poster", genType: "poster", status: "pending" },
      { id: "card", labelKey: "card", genType: "background", status: "pending" },
    ];
  }, [packageType]);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setSourceFile(file);
    setPreviewUrl(preview);
    setAssets([]);
    setCurrentStep(2);
    const scan = await scanImage(file);
    setScanResult(scan);
    setCurrentStep(3);
  }, []);

  const handleGenerateBundle = async () => {
    if (!session) {
      setLoginOpen(true);
      return;
    }
    if (!sourceFile) return;

    setIsGenerating(true);
    setCurrentStep(4);
    setAssets(packageAssets);

    const base64 = await fileToBase64(sourceFile);
    for (const asset of packageAssets) {
      setAssets((prev) =>
        prev.map((a) => (a.id === asset.id ? { ...a, status: "processing" } : a))
      );
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: sourceFile.type || "image/jpeg",
            genType: asset.genType,
          }),
        });
        const data = await res.json();
        if (data.success && data.imageBase64) {
          setAssets((prev) =>
            prev.map((a) =>
              a.id === asset.id
                ? {
                    ...a,
                    status: "done",
                    resultBase64: data.imageBase64,
                    resultMime: data.imageMimeType || "image/png",
                  }
                : a
            )
          );
        } else {
          setAssets((prev) =>
            prev.map((a) =>
              a.id === asset.id ? { ...a, status: "error", error: data.error || "Failed" } : a
            )
          );
        }
      } catch (err) {
        setAssets((prev) =>
          prev.map((a) =>
            a.id === asset.id ? { ...a, status: "error", error: (err as Error).message } : a
          )
        );
      }
    }
    setIsGenerating(false);
  };

  const handleDownload = (asset: DeliveryAsset) => {
    if (!asset.resultBase64) return;
    const link = document.createElement("a");
    const mime = asset.resultMime || "image/png";
    const ext = mime.includes("png") ? "png" : "jpg";
    link.href = `data:${mime};base64,${asset.resultBase64}`;
    link.download = `memorial-${asset.labelKey}.${ext}`;
    link.click();
  };

  const handleDownloadAll = async () => {
    const doneAssets = assets.filter((a) => a.status === "done");
    doneAssets.forEach((asset, idx) => {
      window.setTimeout(() => handleDownload(asset), idx * 280);
    });
  };

  const doneCount = assets.filter((a) => a.status === "done").length;

  return (
    <>
      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-8">{t("edit.title")}</h1>

          {authStatus === "unauthenticated" && (
            <div className="mb-8 p-4 rounded-xl bg-slate-900 border border-slate-700 text-center">
              <p className="text-slate-400 text-sm">{t("edit.loginRequired")}</p>
              <button type="button" onClick={() => setLoginOpen(true)} className="mt-3 text-sm font-medium text-gold hover:text-gold-light transition-colors">
                {t("nav.signIn")}
              </button>
            </div>
          )}

          {/* Step tracker */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`rounded-xl border p-3 ${currentStep >= step.id ? "border-gold/50 bg-gold/10" : "border-slate-800 bg-slate-900/40"}`}
              >
                <p className={`text-xs ${currentStep >= step.id ? "text-gold" : "text-slate-500"}`}>{t("edit.wizard.stepLabel")} {step.id}</p>
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-white" : "text-slate-400"}`}>{t(`edit.wizard.step${step.id}`)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-white">{t("edit.wizard.step1Title")}</h2>
                {currentStep > 1 ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : null}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm font-medium text-white mb-1">{t("edit.wizard.faceTitle")}</p>
                  <p className="text-xs text-slate-400">{t("edit.wizard.faceDesc")}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm font-medium text-white mb-1">{t("edit.wizard.lightingTitle")}</p>
                  <p className="text-xs text-slate-400">{t("edit.wizard.lightingDesc")}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm font-medium text-white mb-1">{t("edit.wizard.qualityTitle")}</p>
                  <p className="text-xs text-slate-400">{t("edit.wizard.qualityDesc")}</p>
                </div>
              </div>
              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="mt-5 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-5 py-2.5 rounded-lg text-sm"
                >
                  {t("edit.wizard.continueUpload")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </section>

            {/* Step 2 */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-white">{t("edit.wizard.step2Title")}</h2>
                {scanResult ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : null}
              </div>
              <UploadZone onFiles={handleFiles} multiple={false} />
              {sourceFile && scanResult && (
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt={t("edit.wizard.uploadedAlt")} className="w-full object-cover max-h-72" />
                  </div>
                  <div className={`rounded-xl border p-4 ${scanResult.status === "good" ? "border-green-500/30 bg-green-900/10" : "border-amber-500/30 bg-amber-900/10"}`}>
                    <p className="text-sm font-semibold text-white mb-2">{t("edit.wizard.autoScanReport")}</p>
                    <p className="text-xs text-slate-400 mb-3">
                      {scanResult.width}×{scanResult.height}px · {scanResult.sizeMB}MB
                    </p>
                    <ul className="space-y-2">
                      {scanResult.noteKeys.map((noteKey) => (
                        <li key={noteKey} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="mt-0.5 text-gold">•</span>
                          <span>{t(`edit.wizard.${noteKey}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Step 3 */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-white">{t("edit.wizard.step3Title")}</h2>
                {currentStep > 3 ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : null}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPackageType("basic")}
                  className={`text-left rounded-xl border p-4 transition-all ${packageType === "basic" ? "border-gold bg-gold/10" : "border-slate-800 bg-slate-950/60 hover:border-slate-700"}`}
                >
                  <p className="text-sm font-semibold text-white">{t("edit.wizard.basicTitle")}</p>
                  <p className="text-xs text-slate-400 mt-1">{t("edit.wizard.basicDesc")}</p>
                  <div className="mt-3 text-xs text-slate-300 space-y-1">
                    <p>• {t("edit.wizard.basicF1")}</p>
                    <p>• {t("edit.wizard.basicF2")}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPackageType("bundle")}
                  className={`relative text-left rounded-xl border p-4 transition-all ${packageType === "bundle" ? "border-gold bg-gold/10" : "border-slate-800 bg-slate-950/60 hover:border-slate-700"}`}
                >
                  <span className="absolute top-3 right-3 text-[10px] bg-gold text-slate-950 px-2 py-0.5 rounded-full font-bold">{t("edit.wizard.recommended")}</span>
                  <p className="text-sm font-semibold text-white">{t("edit.wizard.bundleTitle")}</p>
                  <p className="text-xs text-slate-400 mt-1">{t("edit.wizard.bundleDesc")}</p>
                  <div className="mt-3 text-xs text-slate-300 space-y-1">
                    <p>• {t("edit.wizard.bundleF1")}</p>
                    <p>• {t("edit.wizard.bundleF2")}</p>
                    <p>• {t("edit.wizard.bundleF3")}</p>
                  </div>
                </button>
              </div>
              <button
                type="button"
                onClick={handleGenerateBundle}
                disabled={!sourceFile || isGenerating}
                className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("edit.generating")}
                  </>
                ) : (
                  <>
                    {t("edit.wizard.generateDeliverables")}
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </section>

            {/* Step 4 */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-white">{t("edit.wizard.step4Title")}</h2>
                {doneCount > 0 ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : null}
              </div>

              {assets.length === 0 ? (
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-8 text-center">
                  <UploadCloud className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">{t("edit.wizard.galleryEmpty")}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {assets.map((asset) => (
                      <div key={asset.id} className="rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden">
                        <div className="aspect-[4/5] bg-slate-900 flex items-center justify-center relative">
                          {asset.status === "done" && asset.resultBase64 ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`data:${asset.resultMime};base64,${asset.resultBase64}`} alt={t(`edit.wizard.asset${asset.labelKey.charAt(0).toUpperCase()}${asset.labelKey.slice(1)}`)} className="w-full h-full object-cover" />
                          ) : asset.status === "processing" ? (
                            <Loader2 className="w-7 h-7 animate-spin text-gold" />
                          ) : asset.status === "error" ? (
                            <p className="text-xs text-red-400 px-4 text-center">{asset.error || t("edit.wizard.generationFailed")}</p>
                          ) : (
                            <p className="text-xs text-slate-600">{t("edit.wizard.queued")}</p>
                          )}
                        </div>
                        <div className="p-3 border-t border-slate-800">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-white">{t(`edit.wizard.asset${asset.labelKey.charAt(0).toUpperCase()}${asset.labelKey.slice(1)}`)}</p>
                            <span className="text-[10px] text-slate-500 uppercase">
                              {t(
                                asset.status === "pending"
                                  ? "edit.wizard.statusPending"
                                  : asset.status === "processing"
                                    ? "edit.wizard.statusProcessing"
                                    : asset.status === "done"
                                      ? "edit.wizard.statusDone"
                                      : "edit.wizard.statusError"
                              )}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDownload(asset)}
                            disabled={asset.status !== "done"}
                            className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-gold/50 disabled:opacity-50 disabled:hover:border-slate-700 text-slate-200 py-2 rounded-lg text-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {t("edit.download")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-400">
                      {t("edit.wizard.delivered")} {doneCount}/{assets.length}
                    </p>
                    <button
                      type="button"
                      onClick={handleDownloadAll}
                      disabled={doneCount === 0}
                      className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-semibold px-5 py-2.5 rounded-lg text-sm"
                    >
                      <Shield className="w-4 h-4" />
                      {t("edit.wizard.downloadAll")}
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
