"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Field, IntakeScaffold, loadSurvey, saveSurvey } from "@/app/intake/_components/intake-shared";

export default function Chapter2Page() {
  const router = useRouter();
  const initial = loadSurvey();

  const [education, setEducation] = useState(initial.education);
  const [profession, setProfession] = useState(initial.profession);
  const [workYears, setWorkYears] = useState(initial.workYears);
  const [achievement1, setAchievement1] = useState(initial.achievements[0] || "");
  const [achievement2, setAchievement2] = useState(initial.achievements[1] || "");
  const [childrenCount, setChildrenCount] = useState(initial.childrenCount);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!education.trim()) return setError("Please enter highest education.");
    if (!profession.trim()) return setError("Please enter primary profession.");
    if (!workYears.trim()) return setError("Please enter years of work.");
    if (!achievement1.trim() && !achievement2.trim()) return setError("Please provide at least one core achievement.");

    saveSurvey({
      education: education.trim(),
      profession: profession.trim(),
      workYears: workYears.trim(),
      achievements: [achievement1.trim(), achievement2.trim()],
      childrenCount: childrenCount || "",
    });
    router.push("/intake/chapter-3");
  };

  return (
    <IntakeScaffold
      step={2}
      chapterCn="第二章：奋斗足迹"
      chapterEn="The Journey"
      guidance="他们曾在这片土地上辛勤耕耘，留下了属于他们的勋章。请描述他们的职业生涯与成就。"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Highest Education">
            <input value={education} onChange={(e) => setEducation(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
          </Field>
          <Field label="Primary Profession">
            <input value={profession} onChange={(e) => setProfession(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Years of Work">
            <input value={workYears} onChange={(e) => setWorkYears(e.target.value)} placeholder="e.g. 35 years" className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
          </Field>
          <Field label="Number of Children (optional)">
            <select value={childrenCount} onChange={(e) => setChildrenCount(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white">
              <option value="">Not specified</option>
              {Array.from({ length: 10 }, (_, i) => `${i + 1}`).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Core Achievement #1">
          <input value={achievement1} onChange={(e) => setAchievement1(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
        </Field>
        <Field label="Core Achievement #2 (optional)">
          <input value={achievement2} onChange={(e) => setAchievement2(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
        </Field>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button onClick={handleNext} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-6 py-3 rounded-xl">
          Continue to Chapter 3
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </IntakeScaffold>
  );
}

