"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Field, IntakeScaffold, loadSurvey, saveSurvey } from "@/app/intake/_components/intake-shared";

const personalityOptions = ["Resilient", "Gentle", "Humorous", "Optimistic", "Calm", "Generous", "Disciplined", "Warm-hearted"];

export default function Chapter3Page() {
  const router = useRouter();
  const initial = loadSurvey();

  const [personality, setPersonality] = useState<string[]>(initial.personalityKeywords);
  const [topHobby, setTopHobby] = useState(initial.topHobby);
  const [motto, setMotto] = useState(initial.motto);
  const [error, setError] = useState("");

  const togglePersonality = (value: string) => {
    if (personality.includes(value)) setPersonality(personality.filter((p) => p !== value));
    else setPersonality([...personality, value]);
  };

  const handleNext = () => {
    if (personality.length === 0) return setError("Please choose at least one personality keyword.");
    if (!topHobby.trim()) return setError("Please describe the greatest hobby.");
    if (!motto.trim()) return setError("Please add a favorite quote or motto.");

    saveSurvey({
      personalityKeywords: personality,
      topHobby: topHobby.trim(),
      motto: motto.trim(),
    });
    router.push("/intake/chapter-4");
  };

  return (
    <IntakeScaffold
      step={3}
      chapterCn="第三章：灵魂底色"
      chapterEn="The Soul's Color"
      guidance="除了成就，那些生动的瞬间才最动人。他们是一个怎样的人？最喜欢做些什么？"
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs text-slate-400 mb-2">Personality Keywords</p>
          <div className="flex flex-wrap gap-2">
            {personalityOptions.map((option) => {
              const active = personality.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => togglePersonality(option)}
                  className={`px-3 py-1.5 rounded-full text-xs border ${
                    active ? "border-gold bg-gold/10 text-gold" : "border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <Field label="Greatest Hobby">
          <input value={topHobby} onChange={(e) => setTopHobby(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
        </Field>
        <Field label="Favorite Saying / Motto">
          <input value={motto} onChange={(e) => setMotto(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
        </Field>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button onClick={handleNext} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-6 py-3 rounded-xl">
          Continue to Chapter 4
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </IntakeScaffold>
  );
}

