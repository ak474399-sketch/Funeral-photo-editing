"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Field, IntakeScaffold, loadSurvey, saveSurvey } from "@/app/intake/_components/intake-shared";

export default function Chapter1Page() {
  const router = useRouter();
  const initial = loadSurvey();

  const [name, setName] = useState(initial.name);
  const [gender, setGender] = useState(initial.gender);
  const [birthDate, setBirthDate] = useState(initial.birthDate);
  const [deathDate, setDeathDate] = useState(initial.deathDate);
  const [origin, setOrigin] = useState(initial.origin);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!name.trim()) return setError("Please enter the full name.");
    if (!gender) return setError("Please select gender.");
    if (!birthDate || !deathDate) return setError("Please complete birth and passing dates.");
    if (!origin.trim()) return setError("Please enter place of origin.");

    saveSurvey({
      name: name.trim(),
      gender,
      birthDate,
      deathDate,
      origin: origin.trim(),
    });
    router.push("/intake/chapter-2");
  };

  return (
    <IntakeScaffold
      step={1}
      chapterCn="第一章：尘世印记"
      chapterEn="Earthly Marks"
      guidance="让我们从最基础的开始，记录下他们在世间的第一个印记。"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
          </Field>
          <Field label="Gender">
            <select value={gender} onChange={(e) => setGender(e.target.value as "Male" | "Female" | "")} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Birth Date">
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
          </Field>
          <Field label="Passing Date">
            <input type="date" value={deathDate} onChange={(e) => setDeathDate(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
          </Field>
        </div>

        <Field label="Place of Origin">
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
        </Field>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button onClick={handleNext} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-6 py-3 rounded-xl">
          Continue to Chapter 2
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </IntakeScaffold>
  );
}

