"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Gender = "" | "男" | "女";

const personalities = ["温和", "坚韧", "善良", "幽默", "乐观", "勤奋", "慷慨", "有担当", "有同理心", "沉稳"];
const hobbies = ["阅读", "音乐", "旅行", "园艺", "书法", "烹饪", "摄影", "运动", "志愿服务", "收藏"];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1899 }, (_, i) => `${currentYear - i}`);
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, "0"));
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`.padStart(2, "0"));

export default function IntakePage() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [birthY, setBirthY] = useState("");
  const [birthM, setBirthM] = useState("");
  const [birthD, setBirthD] = useState("");
  const [deathY, setDeathY] = useState("");
  const [deathM, setDeathM] = useState("");
  const [deathD, setDeathD] = useState("");
  const [job, setJob] = useState("");
  const [childrenCount, setChildrenCount] = useState("");
  const [personality, setPersonality] = useState<string[]>([]);
  const [hobby, setHobby] = useState<string[]>([]);
  const [faith, setFaith] = useState("");
  const [error, setError] = useState("");

  const birthDate = useMemo(() => (birthY && birthM && birthD ? `${birthY}-${birthM}-${birthD}` : ""), [birthY, birthM, birthD]);
  const deathDate = useMemo(() => (deathY && deathM && deathD ? `${deathY}-${deathM}-${deathD}` : ""), [deathY, deathM, deathD]);

  const toggleTag = (value: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("请填写姓名。");
      return;
    }
    if (!gender) {
      setError("请选择性别。");
      return;
    }
    if (!birthDate || !deathDate) {
      setError("请完整选择出生和逝世年月日。");
      return;
    }

    const payload = {
      name: name.trim(),
      nickname: nickname.trim(),
      gender,
      birthDate,
      deathDate,
      job: job.trim(),
      childrenCount: childrenCount || "",
      personality,
      hobby,
      faith: faith.trim(),
      submittedAt: new Date().toISOString(),
    };
    sessionStorage.setItem("funeral_survey_v1", JSON.stringify(payload));
    window.location.href = "/studio";
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-gold text-sm mb-1">流程第 1 步 · 问卷调查</p>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold">纪念信息问卷</h1>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-lg hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="姓名（必填）">
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
            </Field>
            <Field label="昵称（可选）">
              <input value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="性别（必填）">
              <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white">
                <option value="">请选择</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </Field>
            <Field label="子女数（可选）">
              <select value={childrenCount} onChange={(e) => setChildrenCount(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white">
                <option value="">不填写</option>
                {Array.from({ length: 10 }, (_, i) => `${i + 1}`).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DateField
              label="出生年月日（必填）"
              y={birthY}
              m={birthM}
              d={birthD}
              setY={setBirthY}
              setM={setBirthM}
              setD={setBirthD}
            />
            <DateField
              label="逝世年月日（必填）"
              y={deathY}
              m={deathM}
              d={deathD}
              setY={setDeathY}
              setM={setDeathM}
              setD={setDeathD}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="职业（可选）">
              <input value={job} onChange={(e) => setJob(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
            </Field>
            <Field label="信仰（可选）">
              <input value={faith} onChange={(e) => setFaith(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white" />
            </Field>
          </div>

          <TagGroup
            label="性格标签（可选，多选）"
            options={personalities}
            selected={personality}
            onToggle={(v) => toggleTag(v, personality, setPersonality)}
          />
          <TagGroup
            label="爱好标签（可选，多选）"
            options={hobbies}
            selected={hobby}
            onToggle={(v) => toggleTag(v, hobby, setHobby)}
          />

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button onClick={handleSubmit} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-slate-950 font-semibold px-6 py-3 rounded-xl">
            进入素材上传与风格选择
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-1.5 block">
      <span className="text-xs text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function DateField({
  label,
  y,
  m,
  d,
  setY,
  setM,
  setD,
}: {
  label: string;
  y: string;
  m: string;
  d: string;
  setY: (v: string) => void;
  setM: (v: string) => void;
  setD: (v: string) => void;
}) {
  return (
    <label className="space-y-1.5 block">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="grid grid-cols-3 gap-2">
        <select value={y} onChange={(e) => setY(e.target.value)} className="rounded-lg bg-slate-950 border border-slate-700 px-2 py-2 text-sm text-white">
          <option value="">年</option>
          {years.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <select value={m} onChange={(e) => setM(e.target.value)} className="rounded-lg bg-slate-950 border border-slate-700 px-2 py-2 text-sm text-white">
          <option value="">月</option>
          {months.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <select value={d} onChange={(e) => setD(e.target.value)} className="rounded-lg bg-slate-950 border border-slate-700 px-2 py-2 text-sm text-white">
          <option value="">日</option>
          {days.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
    </label>
  );
}

function TagGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                active ? "border-gold bg-gold/10 text-gold" : "border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

