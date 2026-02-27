"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldAlert, Trash2, Upload } from "lucide-react";
import {
  STUDIO_UPLOAD_CONTEXT_KEY,
  SURVEY_STORAGE_KEY,
  SurveyData,
  UploadContext,
  buildSurveyProfile,
} from "@/app/studio/_lib/studio-shared";

type UploadedImage = { id: string; file: File; preview: string };

const posterStyles = ["Obsidian Gold", "Ivory Peace", "Slate Reverence", "Classic Monochrome", "Lily Tribute"];
const obituaryStyles = ["Traditional Notice", "Modern Notice", "Warm Remembrance", "Faith Tribute", "Family Announcement"];

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
      reject(new Error("Failed to read image"));
    };
    image.src = url;
  });
}

export default function StudioUploadPage() {
  const router = useRouter();
  const [survey, setSurvey] = useState<SurveyData | null>(null);
  const [ready, setReady] = useState(false);

  const [lifePhoto, setLifePhoto] = useState<UploadedImage | null>(null);
  const [familyPhotos, setFamilyPhotos] = useState<UploadedImage[]>([]);
  const [selectedPosterStyle, setSelectedPosterStyle] = useState("");
  const [selectedObituaryStyle, setSelectedObituaryStyle] = useState("");
  const [previewTarget, setPreviewTarget] = useState<"poster" | "obituary" | null>(null);
  const [complianceReasons, setComplianceReasons] = useState<string[]>([]);

  const lifeInputRef = useRef<HTMLInputElement>(null);
  const familyInputRef = useRef<HTMLInputElement>(null);

  const profile = useMemo(() => buildSurveyProfile(survey), [survey]);

  useEffect(() => {
    const raw = sessionStorage.getItem(SURVEY_STORAGE_KEY);
    if (!raw) {
      router.replace("/intake/chapter-1");
      return;
    }
    try {
      setSurvey(JSON.parse(raw) as SurveyData);
      setReady(true);
    } catch {
      router.replace("/intake/chapter-1");
    }
  }, [router]);

  const handleLifeUpload = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const item = { id: `life_${Date.now()}`, file, preview: URL.createObjectURL(file) };
    setLifePhoto(item);
    setComplianceReasons([]);
  };

  const handleFamilyUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const incoming = Array.from(files)
      .slice(0, 10 - familyPhotos.length)
      .map((file, idx) => ({ id: `fam_${Date.now()}_${idx}`, file, preview: URL.createObjectURL(file) }));
    setFamilyPhotos((prev) => [...prev, ...incoming].slice(0, 10));
    setComplianceReasons([]);
  };

  const removeLifePhoto = () => {
    if (lifePhoto) URL.revokeObjectURL(lifePhoto.preview);
    setLifePhoto(null);
  };

  const removeFamilyPhoto = (id: string) => {
    setFamilyPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  const validateCompliance = async () => {
    const reasons: string[] = [];
    if (!lifePhoto) reasons.push("Missing lifestyle portrait photo.");
    if (familyPhotos.length === 0) reasons.push("At least one family photo is required (up to 10).");
    if (!selectedPosterStyle) reasons.push("Poster style is required.");
    if (!selectedObituaryStyle) reasons.push("Obituary style is required.");

    if (lifePhoto) {
      if (!lifePhoto.file.type.startsWith("image/")) reasons.push("Lifestyle photo must be an image.");
      if (lifePhoto.file.size > 12 * 1024 * 1024) reasons.push("Lifestyle photo exceeds 12MB.");
      try {
        const meta = await readImageMeta(lifePhoto.file);
        if (meta.width < 900 || meta.height < 900) reasons.push("Lifestyle photo should be at least 900x900.");
      } catch {
        reasons.push("Lifestyle photo cannot be read.");
      }
    }

    for (const item of familyPhotos) {
      if (!item.file.type.startsWith("image/")) reasons.push(`Family photo ${item.file.name} is not an image.`);
    }
    return reasons;
  };

  const continueToDelivery = async () => {
    const reasons = await validateCompliance();
    setComplianceReasons(reasons);
    if (reasons.length > 0) return;

    const context: UploadContext = {
      lifePhotoPreview: lifePhoto?.preview ?? "/images/hero-poster.png",
      familyPhotoPreview: familyPhotos[0]?.preview ?? lifePhoto?.preview ?? "/images/hero-poster.png",
      posterStyle: selectedPosterStyle,
      obituaryStyle: selectedObituaryStyle,
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem(STUDIO_UPLOAD_CONTEXT_KEY, JSON.stringify(context));
    router.push("/studio/delivery");
  };

  if (!ready) return <div className="py-20 text-center text-slate-400">Loading survey context...</div>;

  return (
    <div className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-gold text-sm mb-1">Step 2 · Upload Materials & Select Styles</p>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold">Ceremonial Material Studio</h1>
            {profile ? (
              <p className="text-xs text-slate-400 mt-2">
                {profile.fullName} · {profile.lifeRange} · {profile.identityLine}
              </p>
            ) : null}
          </div>
          <Link href="/intake/chapter-4" className="inline-flex items-center gap-2 text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-lg hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Back to Questionnaire
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <h2 className="text-white font-semibold text-lg mb-4">Material Upload Slots</h2>

            <SlotCard
              title="Lifestyle Portrait (Required)"
              uploaded={lifePhoto}
              onUpload={() => lifeInputRef.current?.click()}
              onRemove={removeLifePhoto}
            />
            <input ref={lifeInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleLifeUpload(e.target.files)} />

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-300">Family Photos (1-10)</p>
                <button onClick={() => familyInputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs">
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                </button>
              </div>
              {familyPhotos.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-800/60 p-6 text-center text-slate-500 text-sm">
                  Grey placeholder · Family photos
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {familyPhotos.map((item) => (
                    <div key={item.id} className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.preview} alt="Family source" className="w-full h-24 object-cover" />
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

            <StyleSelector
              title="Poster Style"
              options={posterStyles}
              selected={selectedPosterStyle}
              onSelect={(style) => {
                setSelectedPosterStyle(style);
                setPreviewTarget("poster");
              }}
            />
            <StyleSelector
              title="Obituary Style"
              options={obituaryStyles}
              selected={selectedObituaryStyle}
              onSelect={(style) => {
                setSelectedObituaryStyle(style);
                setPreviewTarget("obituary");
              }}
            />

            {complianceReasons.length > 0 && (
              <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-4 mb-4">
                <p className="text-red-300 text-sm font-semibold mb-2">Compliance failed:</p>
                <ul className="space-y-1.5 text-xs text-red-200">
                  {complianceReasons.map((reason) => (
                    <li key={reason}>- {reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <h2 className="text-white font-semibold text-lg mb-4">Guidance & Preview</h2>
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
              <p className="text-sm text-slate-300 mb-2">Non-compliant examples</p>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>- Face hidden by shadows / severe backlight</li>
                <li>- Extreme blur or tiny low-resolution sources</li>
                <li>- Head heavily cropped and cannot compose portrait</li>
                <li>- Too many subjects with unclear primary person</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-6">
              <p className="text-sm text-slate-300 mb-3">Live Style Preview</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewTarget === "obituary" ? "/images/feature-before-after.png" : "/images/cases-showcase.png"}
                alt="Style preview"
                className="w-full rounded-lg border border-slate-800"
              />
              <p className="text-xs text-slate-400 mt-2">
                Current: {previewTarget === "obituary" ? selectedObituaryStyle || "Obituary style" : selectedPosterStyle || "Poster style"}
              </p>
            </div>

            <button
              onClick={continueToDelivery}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold-light text-slate-950 font-bold text-base shadow-lg shadow-gold/20"
            >
              Continue to Generation Results
            </button>
            <p className="mt-3 text-xs text-slate-500 inline-flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Next step will render low-res watermarked previews.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function SlotCard({
  title,
  uploaded,
  onUpload,
  onRemove,
}: {
  title: string;
  uploaded: UploadedImage | null;
  onUpload: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
      <p className="text-sm text-slate-300 mb-3">{title}</p>
      {!uploaded ? (
        <div className="rounded-lg border border-dashed border-slate-700 bg-slate-800/60 p-6 text-center">
          <p className="text-slate-500 text-sm mb-3">Grey placeholder</p>
          <button onClick={onUpload} className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-slate-950 rounded-lg text-sm font-semibold">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={uploaded.preview} alt={title} className="w-full h-52 object-cover" />
          <div className="p-3 flex items-center justify-between">
            <span className="text-xs text-green-300 inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Uploaded
            </span>
            <button onClick={onRemove} className="text-xs text-red-300 hover:text-red-200 inline-flex items-center gap-1">
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StyleSelector({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (style: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 mb-4">
      <p className="text-sm text-slate-300 mb-3">{title}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((style) => (
          <button
            key={style}
            onClick={() => onSelect(style)}
            className={`px-3 py-2 rounded-lg text-xs border ${
              selected === style ? "border-gold bg-gold/10 text-gold" : "border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
}
