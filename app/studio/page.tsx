"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileArchive,
  Loader2,
  ShieldAlert,
  Trash2,
  Upload,
} from "lucide-react";

type UploadedImage = { id: string; file: File; preview: string };
type GeneratedAsset = {
  id: string;
  type: "portrait" | "poster" | "obituary" | "family";
  title: string;
  preview: string;
};
type DownloadPlan = "basic" | "bundle" | "legacy";
type DownloadMode = "single" | "all" | "zip";

const posterStyles = ["庄严黑金", "温暖米白", "典雅灰蓝", "简约黑白", "花束纪念"];
const obituaryStyles = ["传统讣告", "现代讣告", "温情追思", "宗教纪念", "家族公告"];
const generationTexts = [
  "正在修复老照片细节...",
  "正在优化面部清晰度...",
  "正在换上更体面的西装...",
  "正在生成纪念海报与讣告样式...",
  "正在生成全家福与统一交付素材...",
];

function readImageMeta(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const result = { width: image.width, height: image.height };
      URL.revokeObjectURL(url);
      resolve(result);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("无法读取图片"));
    };
    image.src = url;
  });
}

async function createWatermarkedLowResPreview(src: string, label: string): Promise<string> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("图片加载失败"));
    image.src = src;
  });

  const canvas = document.createElement("canvas");
  const targetWidth = 640;
  const ratio = targetWidth / image.width;
  canvas.width = targetWidth;
  canvas.height = Math.max(360, Math.round(image.height * ratio));

  const ctx = canvas.getContext("2d");
  if (!ctx) return src;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // A subtle dark veil to signal low-res preview
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Repeated watermark
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((-25 * Math.PI) / 180);
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "bold 30px Arial";
  for (let y = -canvas.height; y < canvas.height; y += 110) {
    for (let x = -canvas.width; x < canvas.width; x += 300) {
      ctx.fillText("FuneralPhoto.com DEMO", x, y);
    }
  }
  ctx.restore();

  // Bottom badge watermark
  ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
  ctx.fillRect(10, canvas.height - 44, 270, 34);
  ctx.fillStyle = "#f1f5f9";
  ctx.font = "bold 14px Arial";
  ctx.fillText(`${label} · Low-res Preview`, 22, canvas.height - 22);

  return canvas.toDataURL("image/jpeg", 0.45);
}

export default function StudioPage() {
  const [lifePhoto, setLifePhoto] = useState<UploadedImage | null>(null);
  const [familyPhotos, setFamilyPhotos] = useState<UploadedImage[]>([]);
  const [selectedPosterStyle, setSelectedPosterStyle] = useState("");
  const [selectedObituaryStyle, setSelectedObituaryStyle] = useState("");
  const [complianceReasons, setComplianceReasons] = useState<string[]>([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [animTextIndex, setAnimTextIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);

  const [previewTarget, setPreviewTarget] = useState<"poster" | "obituary" | null>(null);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadMode, setDownloadMode] = useState<DownloadMode>("all");
  const [downloadTargetAsset, setDownloadTargetAsset] = useState<GeneratedAsset | null>(null);

  const lifeInputRef = useRef<HTMLInputElement>(null);
  const familyInputRef = useRef<HTMLInputElement>(null);

  const groupedAssets = useMemo(() => {
    return {
      portrait: generatedAssets.filter((a) => a.type === "portrait"),
      poster: generatedAssets.filter((a) => a.type === "poster"),
      obituary: generatedAssets.filter((a) => a.type === "obituary"),
      family: generatedAssets.filter((a) => a.type === "family"),
    };
  }, [generatedAssets]);

  const handleLifeUpload = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const item: UploadedImage = {
      id: `life_${Date.now()}`,
      file,
      preview: URL.createObjectURL(file),
    };
    setLifePhoto(item);
    setComplianceReasons([]);
    setShowResult(false);
  };

  const handleFamilyUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const incoming = Array.from(files)
      .slice(0, 10 - familyPhotos.length)
      .map((file, idx) => ({
        id: `family_${Date.now()}_${idx}`,
        file,
        preview: URL.createObjectURL(file),
      }));
    setFamilyPhotos((prev) => [...prev, ...incoming].slice(0, 10));
    setComplianceReasons([]);
    setShowResult(false);
  };

  const removeLifePhoto = () => {
    if (lifePhoto) URL.revokeObjectURL(lifePhoto.preview);
    setLifePhoto(null);
    setShowResult(false);
  };

  const removeFamilyPhoto = (id: string) => {
    setFamilyPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((p) => p.id !== id);
    });
    setShowResult(false);
  };

  const validateCompliance = async () => {
    const reasons: string[] = [];
    if (!lifePhoto) reasons.push("缺少生活照，请先上传1张生活照。");
    if (!selectedPosterStyle) reasons.push("未选择海报样式。");
    if (!selectedObituaryStyle) reasons.push("未选择讣告样式。");
    if (familyPhotos.length === 0) reasons.push("请至少上传1张亲人照片（最多10张）。");

    if (lifePhoto) {
      if (!lifePhoto.file.type.startsWith("image/")) reasons.push("生活照文件格式不合规，请上传图片文件。");
      if (lifePhoto.file.size > 12 * 1024 * 1024) reasons.push("生活照文件过大，请控制在12MB以内。");
      try {
        const meta = await readImageMeta(lifePhoto.file);
        if (meta.width < 900 || meta.height < 900) reasons.push("生活照分辨率较低，建议至少 900x900。");
      } catch {
        reasons.push("生活照无法读取，请重新上传。");
      }
    }

    for (const item of familyPhotos) {
      if (!item.file.type.startsWith("image/")) reasons.push(`亲人照片 ${item.file.name} 格式不合规。`);
      if (item.file.size > 12 * 1024 * 1024) reasons.push(`亲人照片 ${item.file.name} 超过12MB。`);
    }
    return reasons;
  };

  const mockGenerateAssets = async () => {
    const source = lifePhoto?.preview ?? "/images/hero-poster.png";
    const familySource = familyPhotos[0]?.preview ?? source;
    const items: GeneratedAsset[] = [];

    const createAssets = async (
      count: number,
      type: GeneratedAsset["type"],
      titlePrefix: string,
      previewSource: string
    ) => {
      for (let i = 0; i < count; i++) {
        const title = `${titlePrefix} ${i + 1}`;
        const preview = await createWatermarkedLowResPreview(previewSource, title);
        items.push({ id: `${type}_${i}`, type, title, preview });
      }
    };

    await createAssets(5, "portrait", "西装遗照", source);
    await createAssets(5, "poster", "纪念海报", source);
    await createAssets(5, "obituary", "讣告样式", source);
    await createAssets(3, "family", "全家福", familySource);
    return items;
  };

  const handleStartGenerate = async () => {
    const reasons = await validateCompliance();
    setComplianceReasons(reasons);
    if (reasons.length > 0) return;

    setIsGenerating(true);
    setShowResult(false);

    let idx = 0;
    const timer = window.setInterval(() => {
      idx = (idx + 1) % generationTexts.length;
      setAnimTextIndex(idx);
    }, 1300);

    try {
      const assets = await mockGenerateAssets();
      setGeneratedAssets(assets);
      setShowResult(true);
    } finally {
      window.clearInterval(timer);
      setIsGenerating(false);
    }
  };

  const openDownloadDialog = (mode: DownloadMode, asset?: GeneratedAsset) => {
    setDownloadMode(mode);
    setDownloadTargetAsset(asset ?? null);
    setDownloadDialogOpen(true);
  };

  const getAllowedTypesByPlan = (plan: DownloadPlan): GeneratedAsset["type"][] => {
    if (plan === "basic") return ["portrait"];
    if (plan === "bundle") return ["portrait", "poster", "obituary"];
    return ["portrait", "poster", "obituary", "family"];
  };

  const runDownloadByPlan = (plan: DownloadPlan) => {
    const allowed = getAllowedTypesByPlan(plan);
    if (plan === "basic") {
      const ok = window.confirm("基础套餐仅可下载仪容遗照。是否放弃全家福、讣告和海报下载？");
      if (!ok) return;
    }
    if (plan === "bundle") {
      const ok = window.confirm("进阶套餐仅可下载遗照、海报与讣告。是否放弃全家福下载？");
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
        alert("所选套餐不包含该素材类型，请升级套餐后下载。");
        return;
      }
      downloadOne(downloadTargetAsset);
      return;
    }

    if (downloadMode === "all") {
      allowedAssets.forEach((asset, idx) => {
        window.setTimeout(() => downloadOne(asset), idx * 180);
      });
      return;
    }

    const content = allowedAssets.map((a) => `${a.title} (${a.type})`).join("\n");
    const blob = new Blob([`ZIP(beta) 列表:\n套餐=${plan}\n\n${content}`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `delivery-${plan}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-gold text-sm mb-1">Beta 版本 · 直达素材工作台（无套餐前置步骤）</p>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold">素材上传工作台（按最高级套餐生成）</h1>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white border border-slate-700 px-4 py-2 rounded-lg">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <h2 className="text-white font-semibold text-lg mb-4">素材上传区</h2>
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
              <p className="text-sm text-slate-300 mb-3">生活照（必传）</p>
              {!lifePhoto ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-800/60 p-6 text-center">
                  <p className="text-slate-500 text-sm mb-3">灰色占位图 · 生活照</p>
                  <button onClick={() => lifeInputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-slate-950 rounded-lg text-sm font-semibold">
                    <Upload className="w-4 h-4" />
                    上传生活照
                  </button>
                </div>
              ) : (
                <div className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lifePhoto.preview} alt="生活照" className="w-full h-52 object-cover" />
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-xs text-green-300 inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      已上传生活照
                    </span>
                    <button onClick={removeLifePhoto} className="text-xs text-red-300 hover:text-red-200 inline-flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" />
                      删除
                    </button>
                  </div>
                </div>
              )}
              <input ref={lifeInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleLifeUpload(e.target.files)} />
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-300">亲人照片（至少1张，最多10张）</p>
                <button onClick={() => familyInputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs">
                  <Upload className="w-3.5 h-3.5" />
                  上传亲人照片
                </button>
              </div>
              {familyPhotos.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-800/60 p-6 text-center text-slate-500 text-sm">
                  灰色占位图 · 亲人照片
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {familyPhotos.map((item) => (
                    <div key={item.id} className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.preview} alt="亲人照片" className="w-full h-24 object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1 flex items-center justify-between">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-300" />
                        <button onClick={() => removeFamilyPhoto(item.id)} className="text-red-300 hover:text-red-200">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <input ref={familyInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFamilyUpload(e.target.files)} />
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
              <p className="text-sm text-slate-300 mb-3">海报样式（必选）</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {posterStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => {
                      setSelectedPosterStyle(style);
                      setPreviewTarget("poster");
                    }}
                    className={`px-3 py-2 rounded-lg text-xs border ${
                      selectedPosterStyle === style
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-slate-700 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
              <p className="text-sm text-slate-300 mb-3">讣告样式（必选）</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {obituaryStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => {
                      setSelectedObituaryStyle(style);
                      setPreviewTarget("obituary");
                    }}
                    className={`px-3 py-2 rounded-lg text-xs border ${
                      selectedObituaryStyle === style
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-slate-700 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {complianceReasons.length > 0 && (
              <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-4 mb-4">
                <p className="text-red-300 text-sm font-semibold mb-2">素材不合规，原因如下：</p>
                <ul className="space-y-1.5 text-xs text-red-200">
                  {complianceReasons.map((reason) => (
                    <li key={reason}>- {reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <h2 className="text-white font-semibold text-lg mb-4">示例与效果预览</h2>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
              <p className="text-sm text-slate-300 mb-2">不符合要求示例</p>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>- 严重逆光导致面部不可见</li>
                <li>- 过度模糊或分辨率过低</li>
                <li>- 头部裁切严重，无法完整构图</li>
                <li>- 多人混杂且主角不明确</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-6">
              <p className="text-sm text-slate-300 mb-3">样式效果预览</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewTarget === "obituary" ? "/images/feature-before-after.png" : "/images/cases-showcase.png"}
                alt="样式效果预览"
                className="w-full rounded-lg border border-slate-800"
              />
              <p className="text-xs text-slate-400 mt-2">
                当前预览：{previewTarget === "obituary" ? selectedObituaryStyle || "讣告样式" : selectedPosterStyle || "海报样式"}
              </p>
            </div>

            <button
              onClick={handleStartGenerate}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold-light text-slate-950 font-bold text-base shadow-lg shadow-gold/20"
            >
              开始生成交付素材（默认最高级套餐）
            </button>
          </section>
        </div>

        {showResult && (
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <h2 className="text-white font-semibold text-lg">效果页 · 交付素材（低像素+水印预览）</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => openDownloadDialog("all")} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-white inline-flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  下载全部
                </button>
                <button onClick={() => openDownloadDialog("zip")} className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-light text-sm text-slate-950 font-semibold inline-flex items-center gap-2">
                  <FileArchive className="w-4 h-4" />
                  下载 ZIP
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {groupedAssets.portrait.length > 0 && (
                <AssetGroup
                  title={`仪容遗照模块（${groupedAssets.portrait.length}）`}
                  items={groupedAssets.portrait}
                  onDownload={(asset) => openDownloadDialog("single", asset)}
                />
              )}
              {groupedAssets.poster.length > 0 && (
                <AssetGroup
                  title={`海报模块（${groupedAssets.poster.length}）`}
                  items={groupedAssets.poster}
                  onDownload={(asset) => openDownloadDialog("single", asset)}
                />
              )}
              {groupedAssets.obituary.length > 0 && (
                <AssetGroup
                  title={`讣告模块（${groupedAssets.obituary.length}）`}
                  items={groupedAssets.obituary}
                  onDownload={(asset) => openDownloadDialog("single", asset)}
                />
              )}
              {groupedAssets.family.length > 0 && (
                <AssetGroup
                  title={`全家福模块（${groupedAssets.family.length}）`}
                  items={groupedAssets.family}
                  onDownload={(asset) => openDownloadDialog("single", asset)}
                />
              )}
            </div>
          </section>
        )}
      </div>

      {isGenerating && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/90 p-8 w-full max-w-md text-center">
            <Loader2 className="w-8 h-8 mx-auto text-gold animate-spin mb-4" />
            <p className="text-white font-semibold mb-2">正在智能生成中...</p>
            <p className="text-sm text-slate-300">{generationTexts[animTextIndex]}</p>
          </div>
        </div>
      )}

      {downloadDialogOpen && (
        <div className="fixed inset-0 z-[110] bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-5">
            <h3 className="text-white font-semibold text-lg mb-2">请选择下载套餐</h3>
            <p className="text-slate-400 text-sm mb-4">
              按你选择的套餐决定可下载素材范围。
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => {
                  runDownloadByPlan("basic");
                  setDownloadDialogOpen(false);
                }}
                className="text-left px-4 py-3 rounded-lg border border-slate-700 hover:border-gold/50 text-slate-200"
              >
                基础套餐（仅仪容遗照）
              </button>
              <button
                onClick={() => {
                  runDownloadByPlan("bundle");
                  setDownloadDialogOpen(false);
                }}
                className="text-left px-4 py-3 rounded-lg border border-slate-700 hover:border-gold/50 text-slate-200"
              >
                进阶套餐（遗照 + 海报 + 讣告）
              </button>
              <button
                onClick={() => {
                  runDownloadByPlan("legacy");
                  setDownloadDialogOpen(false);
                }}
                className="text-left px-4 py-3 rounded-lg border border-gold/40 bg-gold/10 text-gold"
              >
                传承套餐（全部素材）
              </button>
            </div>
            <button
              onClick={() => setDownloadDialogOpen(false)}
              className="mt-4 w-full px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
            >
              取消
            </button>
            <div className="mt-3 text-xs text-slate-500 inline-flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              当前为 Beta 演示：下载文件为低像素且带水印
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
              <button
                onClick={() => onDownload(asset)}
                className="mt-2 w-full text-[11px] py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                下载
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
