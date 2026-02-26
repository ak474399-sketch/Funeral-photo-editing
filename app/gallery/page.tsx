"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Download, Loader2, ImageIcon, Share2 } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { LoginModal } from "@/components/shared/login-modal";

type Generation = {
  id: string;
  gen_type: string;
  result_url: string | null;
  created_at: string;
};

const GEN_TYPE_LABELS: Record<string, string> = {
  portrait: "Formal Portrait",
  colorize: "Colorization",
  attire: "Attire Replacement",
  background: "Background Edit",
  composite: "Family Composite",
  poster: "Memorial Poster",
};

export default function GalleryPage() {
  const { t } = useLocale();
  const { data: session, status: authStatus } = useSession();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (authStatus !== "authenticated") {
      setLoading(false);
      return;
    }
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        setGenerations(data.generations ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [authStatus]);

  const handleShare = (url: string) => {
    if (navigator.share) {
      navigator.share({ title: "Memorial Photo", url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  if (authStatus === "unauthenticated") {
    return (
      <>
        <div className="py-20 text-center">
          <ImageIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">{t("gallery.loginRequired")}</p>
          <button type="button" onClick={() => setLoginOpen(true)} className="text-sm font-medium text-gold hover:text-gold-light transition-colors">
            {t("nav.signIn")}
          </button>
        </div>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="mb-10">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">{t("gallery.title")}</h1>
          <p className="text-slate-400 mt-2">{t("gallery.subtitle")}</p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto" />
            <p className="text-slate-500 mt-3 text-sm">{t("gallery.loading")}</p>
          </div>
        ) : generations.length === 0 ? (
          <div className="py-20 text-center">
            <ImageIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500">{t("gallery.empty")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generations.map((gen) => (
              <div key={gen.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden group">
                {gen.result_url ? (
                  <div className="aspect-[3/4] overflow-hidden bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={gen.result_url} alt={GEN_TYPE_LABELS[gen.gen_type] ?? gen.gen_type} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-slate-800 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-slate-700" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-gold">{GEN_TYPE_LABELS[gen.gen_type] ?? gen.gen_type}</span>
                      <p className="text-xs text-slate-500 mt-0.5">{new Date(gen.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      {gen.result_url && (
                        <>
                          <a href={gen.result_url} download className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors" aria-label={t("gallery.download")}>
                            <Download className="w-4 h-4" />
                          </a>
                          <button type="button" onClick={() => handleShare(gen.result_url!)} className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors" aria-label="Share">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
