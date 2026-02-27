"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export type MemorialTone = "Solemn" | "Warm" | "Epic";

export type IntakeSurvey = {
  name: string;
  gender: "" | "Male" | "Female";
  birthDate: string;
  deathDate: string;
  origin: string;
  education: string;
  profession: string;
  workYears: string;
  achievements: string[];
  childrenCount: string;
  personalityKeywords: string[];
  topHobby: string;
  motto: string;
  keyRelations: string;
  finalWords: string;
  memorialTone: MemorialTone | "";
  // Backward-compatible fields used by studio page
  nickname?: string;
  job?: string;
  personality?: string[];
  hobby?: string[];
  faith?: string;
};

export const INTAKE_STORAGE_KEY = "funeral_survey_v1";

export const CHAPTERS = [
  { step: 1, slug: "chapter-1", title: "Earthly Marks" },
  { step: 2, slug: "chapter-2", title: "The Journey" },
  { step: 3, slug: "chapter-3", title: "The Soul's Color" },
  { step: 4, slug: "chapter-4", title: "Eternal Bond" },
] as const;

export const DEFAULT_SURVEY: IntakeSurvey = {
  name: "",
  gender: "",
  birthDate: "",
  deathDate: "",
  origin: "",
  education: "",
  profession: "",
  workYears: "",
  achievements: ["", ""],
  childrenCount: "",
  personalityKeywords: [],
  topHobby: "",
  motto: "",
  keyRelations: "",
  finalWords: "",
  memorialTone: "",
  nickname: "",
  job: "",
  personality: [],
  hobby: [],
  faith: "",
};

export function loadSurvey(): IntakeSurvey {
  if (typeof window === "undefined") return DEFAULT_SURVEY;
  const raw = window.sessionStorage.getItem(INTAKE_STORAGE_KEY);
  if (!raw) return DEFAULT_SURVEY;
  try {
    return { ...DEFAULT_SURVEY, ...(JSON.parse(raw) as Partial<IntakeSurvey>) };
  } catch {
    return DEFAULT_SURVEY;
  }
}

export function saveSurvey(patch: Partial<IntakeSurvey>): IntakeSurvey {
  const prev = loadSurvey();
  const next = { ...prev, ...patch };
  if (next.profession) next.job = next.profession;
  if (next.personalityKeywords.length > 0) next.personality = next.personalityKeywords;
  if (next.topHobby) next.hobby = [next.topHobby];
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function IntakeScaffold({
  step,
  chapterCn,
  chapterEn,
  guidance,
  children,
}: {
  step: 1 | 2 | 3 | 4;
  chapterCn: string;
  chapterEn: string;
  guidance: string;
  children: ReactNode;
}) {
  const percent = (step / CHAPTERS.length) * 100;
  const remaining = CHAPTERS.length - step;

  return (
    <div className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-gold text-sm mb-1">
              Chapter {step} of {CHAPTERS.length}
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold">
              {chapterCn} ({chapterEn})
            </h1>
            <p className="text-slate-400 text-sm mt-2">{guidance}</p>
          </div>
          <Link
            href={step === 1 ? "/" : `/intake/chapter-${step - 1}`}
            className="inline-flex items-center gap-2 text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-lg hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 1 ? "Back to Home" : "Previous Chapter"}
          </Link>
        </div>

        <div className="mb-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400">Ritual Progress</span>
            <span className="text-gold">
              {remaining === 0 ? "Final Chapter" : `${remaining} chapter(s) remaining`}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold/80 to-amber-400 transition-all" style={{ width: `${percent}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 text-[11px]">
            {CHAPTERS.map((c) => (
              <div key={c.slug} className={`rounded-md border px-2 py-1.5 text-center ${c.step <= step ? "border-gold/40 text-gold bg-gold/10" : "border-slate-700 text-slate-500"}`}>
                {c.title}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-1.5 block">
      <span className="text-xs text-slate-400">{label}</span>
      {children}
    </label>
  );
}

