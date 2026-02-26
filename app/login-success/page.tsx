"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function LoginSuccessPage() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.replace("/?login=success");
    }
  }, [status]);

  useEffect(() => {
    if (status !== "unauthenticated") return;
    const t = setTimeout(() => window.location.replace("/"), 3000);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-slate-300">
        <Loader2 className="w-12 h-12 animate-spin text-gold" />
        <p className="text-lg font-medium">Logging you in…</p>
      </div>
    </div>
  );
}
