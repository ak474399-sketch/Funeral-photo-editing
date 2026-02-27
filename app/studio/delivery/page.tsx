"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, FileArchive, Loader2, ShieldAlert } from "lucide-react";
import {
  DownloadPlan,
  GeneratedAsset,
  STUDIO_UPLOAD_CONTEXT_KEY,
  SURVEY_STORAGE_KEY,
  SurveyData,
  UploadContext,
  buildEpitaphDraft,
  buildPrayerDraft,
  buildSurveyProfile,
  createWatermarkedLowResPreview,
  generationTexts,
  getAllowedTypesByPlan,
} from "@/app/studio/_lib/studio-shared";

type DownloadMode = "single" | "all" | "zip";
type PaymentStep = "plan" | "pay" | "success";

export default function StudioDeliveryPage() {
  const router = useRouter();
  const [survey, setSurvey] = useState<SurveyData | null>(null);
  const [context, setContext] = useState<UploadContext | null>(null);

  const [isGenerating, setIsGenerating] = useState(true);
  const [animTextIndex, setAnimTextIndex] = useState(0);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);

  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadMode, setDownloadMode] = useState<DownloadMode>("all");
  const [downloadTargetAsset, setDownloadTargetAsset] = useState<GeneratedAsset | null>(null);
  const [paymentStep, setPaymentStep] = useState<PaymentStep>("plan");
  const [pendingPlan, setPendingPlan] = useState<DownloadPlan>("legacy");
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const surveyRaw = sessionStorage.getItem(SURVEY_STORAGE_KEY);
    const contextRaw = sessionStorage.getItem(STUDIO_UPLOAD_CONTEXT_KEY);
    if (!surveyRaw || !contextRaw) {
      router.replace("/studio/upload");
      return;
    }
    try {
      setSurvey(JSON.parse(surveyRaw) as SurveyData);
      setContext(JSON.parse(contextRaw) as UploadContext);
    } catch {
      router.replace("/studio/upload");
    }
  }, [router]);

  useEffect(() => {
    if (!context) return;
    let active = true;
    let idx = 0;
    const timer = window.setInterval(() => {
      idx = (idx + 1) % generationTexts.length;
      setAnimTextIndex(idx);
    }, 1300);

    const run = async () => {
      setIsGenerating(true);
      const items: GeneratedAsset[] = [];
      const createAssets = async (
        count: number,
        type: GeneratedAsset["type"],
        titlePrefix: string,
        source: string
      ) => {
        for (let i = 0; i < count; i++) {
          const title = `${titlePrefix} ${i + 1}`;
          const preview = await createWatermarkedLowResPreview(source, title);
          items.push({ id: `${type}_${i}`, type, title, preview });
        }
      };

      await createAssets(5, "portrait", "Formal Portrait", context.lifePhotoPreview);
      await createAssets(5, "poster", `${context.posterStyle} Poster`, context.lifePhotoPreview);
      await createAssets(5, "obituary", `${context.obituaryStyle} Obituary`, context.lifePhotoPreview);
      await createAssets(3, "family", "Family Tribute", context.familyPhotoPreview);

      if (!active) return;
      setGeneratedAssets(items);
      setIsGenerating(false);
      window.clearInterval(timer);
    };

    void run();
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [context]);

  const groupedAssets = useMemo(
    () => ({
      portrait: generatedAssets.filter((a) => a.type === "portrait"),
      poster: generatedAssets.filter((a) => a.type === "poster"),
      obituary: generatedAssets.filter((a) => a.type === "obituary"),
      family: generatedAssets.filter((a) => a.type === "family"),
    }),
    [generatedAssets]
  );

  const surveyProfile = useMemo(() => buildSurveyProfile(survey), [survey]);
  const prayerDraft = useMemo(() => buildPrayerDraft(surveyProfile), [surveyProfile]);
  const epitaphDraft = useMemo(() => buildEpitaphDraft(surveyProfile), [surveyProfile]);

  const openDownloadDialog = (mode: DownloadMode, asset?: GeneratedAsset) => {
    setDownloadMode(mode);
    setDownloadTargetAsset(asset ?? null);
    setPaymentStep("plan");
    setPendingPlan("legacy");
    setDownloadDialogOpen(true);
  };

  const runDownloadByPlan = (plan: DownloadPlan) => {
    const allowed = getAllowedTypesByPlan(plan);
    if (plan === "basic") {
      const ok = window.confirm("Basic allows portraits only. Forfeit family, obituary, and poster files?");
      if (!ok) return;
    }
    if (plan === "bundle") {
      const ok = window.confirm("Bundle excludes family tribute files. Continue?");
      if (!ok) return;
    }

    const allowedAssets = generatedAssets.filter((a) => allowed.includes(a.type));
    if (allowedAssets.length === 0) return;

    const downloadOne = (asset: GeneratedAsset) => {
      const link = document.createElement("a");
      link.href = asset.preview;
      link.download = `${asset.title}.jpg`;
      link.click();
    };

    if (downloadMode === "single") {
      if (!downloadTargetAsset) return;
      if (!allowed.includes(downloadTargetAsset.type)) {
        alert("Your selected plan does not include this asset type.");
        return;
      }
      downloadOne(downloadTargetAsset);
      return;
    }

    if (downloadMode === "all") {
      allowedAssets.forEach((asset, idx) => window.setTimeout(() => downloadOne(asset), idx * 150));
      return;
    }

    const content = allowedAssets.map((a) => `${a.title} (${a.type})`).join("\n");
    const blob = new Blob([`ZIP(beta) manifest\nplan=${plan}\n\n${content}`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `delivery-${plan}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleChoosePlanForPayment = (plan: DownloadPlan) => {
    const allowed = getAllowedTypesByPlan(plan);
    if (downloadMode === "single" && downloadTargetAsset && !allowed.includes(downloadTargetAsset.type)) {
      alert("Your selected plan does not include this asset type.");
      return;
    }
    if (plan === "basic") {
      const ok = window.confirm("Basic allows portraits only. Forfeit family, obituary, and poster files?");
      if (!ok) return;
    }
    if (plan === "bundle") {
      const ok = window.confirm("Bundle excludes family tribute files. Continue?");
      if (!ok) return;
    }
    setPendingPlan(plan);
    setPaymentStep("pay");
  };

  const handlePayAndDownload = () => {
    setIsPaying(true);
    window.setTimeout(() => {
      runDownloadByPlan(pendingPlan);
      setIsPaying(false);
      setPaymentStep("success");
    }, 1400);
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-gold text-sm mb-1">Step 3 · Delivery Gallery</p>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold">Generated Tribute Assets</h1>
            {context ? (
              <p className="text-xs text-slate-400 mt-2">
                Poster style: {context.posterStyle} · Obituary style: {context.obituaryStyle}
              </p>
            ) : null}
          </div>
          <Link href="/studio/upload" className="inline-flex items-center gap-2 text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-lg hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Link>
        </div>

        {isGenerating ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-10 text-center">
            <Loader2 className="w-8 h-8 mx-auto text-gold animate-spin mb-4" />
            <p className="text-white font-semibold mb-2">Generating your delivery assets...</p>
            <p className="text-sm text-slate-300">{generationTexts[animTextIndex]}</p>
          </div>
        ) : (
          <>
            <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 mb-6">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <h2 className="text-white font-semibold text-lg">Delivery Modules (Watermarked Low-Res Preview)</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => openDownloadDialog("all")} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-white inline-flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                  <button onClick={() => openDownloadDialog("zip")} className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-light text-sm text-slate-950 font-semibold inline-flex items-center gap-2">
                    <FileArchive className="w-4 h-4" />
                    Download ZIP
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <AssetGroup title={`Formal Portraits (${groupedAssets.portrait.length})`} items={groupedAssets.portrait} onDownload={(asset) => openDownloadDialog("single", asset)} />
                <AssetGroup title={`Memorial Posters (${groupedAssets.poster.length})`} items={groupedAssets.poster} onDownload={(asset) => openDownloadDialog("single", asset)} />
                <AssetGroup title={`Obituary Layouts (${groupedAssets.obituary.length})`} items={groupedAssets.obituary} onDownload={(asset) => openDownloadDialog("single", asset)} />
                <AssetGroup title={`Family Tribute Composites (${groupedAssets.family.length})`} items={groupedAssets.family} onDownload={(asset) => openDownloadDialog("single", asset)} />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                <h3 className="text-sm font-semibold text-white mb-2">Funeral Prayer Draft</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{prayerDraft || "Prayer draft will appear based on questionnaire data."}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                <h3 className="text-sm font-semibold text-white mb-2">Epitaph Draft</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{epitaphDraft || "Epitaph draft will appear based on questionnaire data."}</p>
              </div>
            </section>
          </>
        )}
      </div>

      {downloadDialogOpen && (
        <div className="fixed inset-0 z-[110] bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-5">
            {paymentStep === "plan" && (
              <>
                <h3 className="text-white font-semibold text-lg mb-2">Select Download Plan</h3>
                <p className="text-slate-400 text-sm mb-4">Your selected plan controls which asset categories can be downloaded.</p>
                <div className="grid grid-cols-1 gap-2">
                  <button onClick={() => handleChoosePlanForPayment("basic")} className="text-left px-4 py-3 rounded-lg border border-slate-700 hover:border-gold/50 text-slate-200">
                    Basic · Portrait only · $19.99
                  </button>
                  <button onClick={() => handleChoosePlanForPayment("bundle")} className="text-left px-4 py-3 rounded-lg border border-slate-700 hover:border-gold/50 text-slate-200">
                    Bundle · Portrait + Poster + Obituary · $49.99
                  </button>
                  <button onClick={() => handleChoosePlanForPayment("legacy")} className="text-left px-4 py-3 rounded-lg border border-gold/40 bg-gold/10 text-gold">
                    Legacy · All files · $99.99
                  </button>
                </div>
              </>
            )}

            {paymentStep === "pay" && (
              <>
                <h3 className="text-white font-semibold text-lg mb-2">Payment Confirmation</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Selected plan:
                  <span className="text-gold ml-1">{pendingPlan}</span>
                </p>
                <button
                  onClick={handlePayAndDownload}
                  disabled={isPaying}
                  className="w-full px-4 py-3 rounded-lg bg-gold hover:bg-gold-light text-slate-950 font-semibold inline-flex items-center justify-center gap-2"
                >
                  {isPaying ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {isPaying ? "Processing payment..." : "Pay and Download"}
                </button>
              </>
            )}

            {paymentStep === "success" && (
              <>
                <h3 className="text-white font-semibold text-lg mb-2">Download Started</h3>
                <p className="text-slate-300 text-sm mb-4">Payment succeeded. Preview files were downloaded according to your plan.</p>
                <button onClick={() => setDownloadDialogOpen(false)} className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100">
                  Close
                </button>
              </>
            )}

            <button onClick={() => setDownloadDialogOpen(false)} className="mt-4 w-full px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white">
              Cancel
            </button>
            <div className="mt-3 text-xs text-slate-500 inline-flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Beta mode: preview downloads are low-res and watermarked.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AssetGroup({
  title,
  items,
  onDownload,
}: {
  title: string;
  items: GeneratedAsset[];
  onDownload: (asset: GeneratedAsset) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
      <h3 className="text-sm text-white font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {items.map((asset) => (
          <div key={asset.id} className="rounded-lg overflow-hidden border border-slate-700 bg-slate-950/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.preview} alt={asset.title} className="w-full h-32 object-cover" />
            <div className="p-2">
              <p className="text-xs text-slate-200 line-clamp-1">{asset.title}</p>
              <button onClick={() => onDownload(asset)} className="mt-2 w-full text-[11px] py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
