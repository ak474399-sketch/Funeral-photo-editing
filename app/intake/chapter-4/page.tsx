"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Field, IntakeScaffold, MemorialTone, loadSurvey, saveSurvey } from "@/app/intake/_components/intake-shared";

export default function Chapter4Page() {
  const router = useRouter();
  const initial = loadSurvey();

  const [keyRelations, setKeyRelations] = useState(initial.keyRelations);
  const [finalWords, setFinalWords] = useState(initial.finalWords);
  const [memorialTone, setMemorialTone] = useState<MemorialTone | "">(initial.memorialTone);
  const [error, setError] = useState("");

  const handleFinish = () => {
    if (!keyRelations.trim()) return setError("Please provide key relatives or loved ones.");
    if (!finalWords.trim()) return setError("Please write your final words.");
    if (!memorialTone) return setError("Please choose a memorial tone.");

    saveSurvey({
      keyRelations: keyRelations.trim(),
      finalWords: finalWords.trim(),
      memorialTone,
    });
    router.push("/studio");
  };

  return (
    <IntakeScaffold
      step={4}
      chapterCn="第四章：永恒连接"
      chapterEn="Eternal Bond"
      guidance="最后，让我们记录下那些深深眷恋着他们的人，以及您想留给世界的最后告别。"
    >
      <div className="space-y-4">
        <Field label="Key Relatives (spouse, close friend, siblings)">
          <textarea
            value={keyRelations}
            onChange={(e) => setKeyRelations(e.target.value)}
            rows={3}
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white"
          />
        </Field>

        <Field label="Your Final Words to Them">
          <textarea
            value={finalWords}
            onChange={(e) => setFinalWords(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white"
          />
        </Field>

        <Field label="Preferred Memorial Tone">
          <select
            value={memorialTone}
            onChange={(e) => setMemorialTone(e.target.value as MemorialTone | "")}
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white"
          >
            <option value="">Select tone</option>
            <option value="Solemn">Solemn</option>
            <option value="Warm">Warm</option>
            <option value="Epic">Epic</option>
          </select>
        </Field>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button onClick={handleFinish} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-6 py-3 rounded-xl">
          Proceed to Upload & Style Selection
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </IntakeScaffold>
  );
}

