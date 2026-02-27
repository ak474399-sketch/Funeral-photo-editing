"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Download, Trash2, Upload, Loader2, FileArchive, ArrowLeft } from "lucide-react";

type Tier = "basic" | "bundle" | "legacy";
type UploadedImage = { id: string; file: File; preview: string };
type GeneratedAsset = { id: string; type: "portrait" | "poster" | "obituary" | "family"; title: string; preview: string };

const posterStyles = ["庄严黑金", "温暖米白", "典雅灰蓝", "简约黑白", "花束纪念"];
const obituaryStyles = ["传统讣告", "现代讣告", "温情追思", "宗教纪念", "家族公告"];
const generationTexts = [
  "正在修复老照片细节...",
  "正在优化面部清晰度...",
  "正在换上更体面的正装...",
  "正在生成纪念海报版式...",
  "正在整理交付素材...",
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

export default function StudioTierPage() {
  const params = useParams<{ tier: string }>();
  const tier = (params?.tier ?? "basic") as Tier;

  const [lifePhoto, setLifePhoto] = useState<UploadedImage | null>(null);
  const [familyPhotos, setFamilyPhotos] = useState<UploadedImage[]>([]);
  const [selectedPosterStyle, setSelectedPosterStyle] = useState<string>("");
  const [selectedObituaryStyle, setSelectedObituaryStyle] = useState<string>("");
  const [complianceReasons, setComplianceReasons] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  const [animTextIndex, setAnimTextIndex] = useState(0);

  const lifeInputRef = useRef<HTMLInputElement>(null);
  const familyInputRef = useRef<HTMLInputElement>(null);

  const tierLabel = useMemo(() => {
    if (tier === "basic") return "标准套餐";
    if (tier === "bundle") return "纪念套餐";
    return "传承套餐";
  }, [tier]);

  const canUseStyles = tier !== "basic";
  const canUseFamily = tier === "legacy";

  const resultPlan = useMemo(() => {
    if (tier === "basic") return { portrait: 3, poster: 0, obituary: 0, family: 0 };
    if (tier === "bundle") return { portrait: 5, poster: 5, obituary: 5, family: 0 };
    return { portrait: 5, poster: 5, obituary: 5, family: 3 };
  }, [tier]);

  const handleLifeUpload = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const item: UploadedImage = {
      id: `life_${Date.now()}`,
      file,
      preview: URL.createObjectURL(file),
    };
    setLifePhoto(item);
    setShowResult(false);
    setComplianceReasons([]);
  };

  const handleFamilyUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const incoming = Array.from(files).slice(0, 10 - familyPhotos.length).map((file, idx) => ({
      id: `family_${Date.now()}_${idx}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setFamilyPhotos((prev) => [...prev, ...incoming].slice(0, 10));
    setShowResult(false);
    setComplianceReasons([]);
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
    if (!lifePhoto) {
      reasons.push("缺少生活照，请先上传1张生活照。");
    }

    if (canUseStyles) {
      if (!selectedPosterStyle) reasons.push("未选择海报样式。");
      if (!selectedObituaryStyle) reasons.push("未选择讣告样式。");
    }

    if (canUseFamily && familyPhotos.length === 0) {
      reasons.push("传承套餐至少需要上传1张亲人照片（最多10张）。");
    }

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

  const mockGenerateAssets = () => {
    const source = lifePhoto?.preview ?? "/images/hero-poster.png";
    const familySource = familyPhotos[0]?.preview ?? source;
    const items: GeneratedAsset[] = [];

    for (let i = 0; i < resultPlan.portrait; i++) {
      items.push({ id: `portrait_${i}`, type: "portrait", title: `西装遗照 ${i + 1}`, preview: source });
    }
    for (let i = 0; i < resultPlan.poster; i++) {
      items.push({ id: `poster_${i}`, type: "poster", title: `纪念海报 ${i + 1}`, preview: source });
    }
    for (let i = 0; i < resultPlan.obituary; i++) {
      items.push({ id: `obit_${i}`, type: "obituary", title: `讣告样式 ${i + 1}`, preview: source });
    }
    for (let i = 0; i < resultPlan.family; i++) {
      items.push({ id: `family_${i}`, type: "family", title: `全家福 ${i + 1}`, preview: familySource });
    }
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
    }, 1400);

    window.setTimeout(() => {
      window.clearInterval(timer);
      setGeneratedAssets(mockGenerateAssets());
      setIsGenerating(false);
      setShowResult(true);
    }, 6000);
  };

  const handleDownloadOne = (asset: GeneratedAsset) => {
    const link = document.createElement("a");
    link.href = asset.preview;
    link.download = `${asset.title}.jpg`;
    link.click();
  };

  const handleDownloadAll = () => {
    generatedAssets.forEach((asset, idx) => {
      window.setTimeout(() => handleDownloadOne(asset), idx * 180);
    });
  };

  const handleDownloadZip = () => {
    const content = generatedAssets.map((a) => `${a.title} (${a.type})`).join("\n");
    const blob = new Blob([`ZIP(beta) 列表:\n${content}`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `delivery-${tierLabel}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-gold text-sm mb-1">Beta 版本 · 暂不鉴权</p>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold">{tierLabel} · 素材上传工作台</h1>
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white border border-slate-700 px-4 py-2 rounded-lg">
            <ArrowLeft className="w-4 h-4" />
            返回套餐选择
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: upload material layout */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <h2 className="text-white font-semibold text-lg mb-4">素材上传区</h2>

            {/* life photo slot */}
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

            {canUseFamily && (
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-slate-300">亲人照片（最多10张）</p>
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
            )}

            {canUseStyles && (
              <>
                <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
                  <p className="text-sm text-slate-300 mb-3">海报样式（必选）</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {posterStyles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setSelectedPosterStyle(style)}
                        className={`px-3 py-2 rounded-lg text-xs border ${selectedPosterStyle === style ? "border-gold bg-gold/10 text-gold" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
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
                        onClick={() => setSelectedObituaryStyle(style)}
                        className={`px-3 py-2 rounded-lg text-xs border ${selectedObituaryStyle === style ? "border-gold bg-gold/10 text-gold" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

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

          {/* Right: samples + preview + main button */}
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
              <p className="text-sm text-slate-300 mb-3">上传前后效果预览</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/feature-before-after.png" alt="效果预览" className="w-full rounded-lg border border-slate-800" />
            </div>

            <button
              onClick={handleStartGenerate}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold-light text-slate-950 font-bold text-base shadow-lg shadow-gold/20"
            >
              开始生成交付素材
            </button>
          </section>
        </div>

        {showResult && (
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <h2 className="text-white font-semibold text-lg">效果页 · 交付素材平铺展示</h2>
              <div className="flex items-center gap-2">
                <button onClick={handleDownloadAll} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-white inline-flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  下载全部
                </button>
                <button onClick={handleDownloadZip} className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-light text-sm text-slate-950 font-semibold inline-flex items-center gap-2">
                  <FileArchive className="w-4 h-4" />
                  下载 ZIP
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {generatedAssets.map((asset) => (
                <div key={asset.id} className="rounded-lg overflow-hidden border border-slate-700 bg-slate-950/70">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset.preview} alt={asset.title} className="w-full h-32 object-cover" />
                  <div className="p-2">
                    <p className="text-xs text-slate-200 line-clamp-1">{asset.title}</p>
                    <button onClick={() => handleDownloadOne(asset)} className="mt-2 w-full text-[11px] py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">
                      下载
                    </button>
                  </div>
                </div>
              ))}
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
    </div>
  );
}

