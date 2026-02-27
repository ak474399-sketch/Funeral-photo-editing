export type UploadedImage = { id: string; preview: string; name?: string };

export type GeneratedAsset = {
  id: string;
  type: "portrait" | "poster" | "obituary" | "family";
  title: string;
  preview: string;
};

export type DownloadPlan = "basic" | "bundle" | "legacy";

export type SurveyData = {
  name: string;
  nickname?: string;
  gender: string;
  birthDate: string;
  deathDate: string;
  origin?: string;
  education?: string;
  profession?: string;
  workYears?: string;
  achievements?: string[];
  childrenCount?: string;
  personalityKeywords?: string[];
  topHobby?: string;
  motto?: string;
  keyRelations?: string;
  finalWords?: string;
  memorialTone?: "Solemn" | "Warm" | "Epic" | "";
  job?: string;
  personality?: string[];
  hobby?: string[];
  faith?: string;
};

export type UploadContext = {
  lifePhotoPreview: string;
  familyPhotoPreview: string;
  posterStyle: string;
  obituaryStyle: string;
  createdAt: string;
};

export const SURVEY_STORAGE_KEY = "funeral_survey_v1";
export const STUDIO_UPLOAD_CONTEXT_KEY = "funeral_upload_context_v1";

export const generationTexts = [
  "Refining facial details with dignity...",
  "Balancing tones for a respectful portrait...",
  "Enhancing attire and ceremonial presentation...",
  "Designing memorial poster and obituary layouts...",
  "Preparing final delivery assets...",
];

export async function createWatermarkedLowResPreview(src: string, label: string): Promise<string> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("image load failed"));
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
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
  ctx.fillRect(10, canvas.height - 44, 270, 34);
  ctx.fillStyle = "#f1f5f9";
  ctx.font = "bold 14px Arial";
  ctx.fillText(`${label} · Low-res Preview`, 22, canvas.height - 22);

  return canvas.toDataURL("image/jpeg", 0.45);
}

export function getAllowedTypesByPlan(plan: DownloadPlan): GeneratedAsset["type"][] {
  if (plan === "basic") return ["portrait"];
  if (plan === "bundle") return ["portrait", "poster", "obituary"];
  return ["portrait", "poster", "obituary", "family"];
}

export function buildSurveyProfile(survey: SurveyData | null) {
  if (!survey) return null;
  return {
    fullName: survey.name || "Unknown",
    lifeRange: survey.birthDate && survey.deathDate ? `${survey.birthDate} — ${survey.deathDate}` : "Date not specified",
    identityLine: [survey.gender, survey.origin].filter(Boolean).join(" · ") || "Identity not specified",
    journeyLine: [survey.education, survey.profession, survey.workYears ? `${survey.workYears} years of service` : ""]
      .filter(Boolean)
      .join(" · "),
    achievements: (survey.achievements || []).filter(Boolean),
    soulLine: [survey.personalityKeywords?.join(", "), survey.topHobby].filter(Boolean).join(" · "),
    motto: survey.motto || "",
    bondLine: survey.keyRelations || "",
    tone: survey.memorialTone || "Solemn",
    finalWords: survey.finalWords || "",
  };
}

export function buildPrayerDraft(profile: ReturnType<typeof buildSurveyProfile>) {
  if (!profile) return "";
  const toneLead =
    profile.tone === "Warm"
      ? "May gentle comfort embrace every grieving heart."
      : profile.tone === "Epic"
        ? "May this legacy echo through generations with enduring light."
        : "May peace and dignity accompany this farewell.";
  return [
    `We gather in remembrance of ${profile.fullName}.`,
    toneLead,
    profile.journeyLine
      ? `For years, they walked with purpose: ${profile.journeyLine}.`
      : "Their journey leaves a lasting mark among us.",
    profile.soulLine
      ? `Their spirit shone through ${profile.soulLine}.`
      : "Their spirit remains in every cherished memory.",
    profile.finalWords
      ? `A final message to hold close: “${profile.finalWords}”`
      : "May love continue to guide the family in days ahead.",
  ].join(" ");
}

export function buildEpitaphDraft(profile: ReturnType<typeof buildSurveyProfile>) {
  if (!profile) return "";
  const toneTail =
    profile.tone === "Warm"
      ? "Forever loved, forever near."
      : profile.tone === "Epic"
        ? "A legacy that time cannot fade."
        : "Rest in peace and honor.";
  if (profile.motto) return `“${profile.motto}” — ${profile.fullName}. ${toneTail}`;
  return `${profile.fullName}. ${toneTail}`;
}

