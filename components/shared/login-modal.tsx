"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/modal";
import { useLocale } from "@/components/shared/locale-provider";

const AUTH_CALLBACK_URL = "/login-success";

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLocale();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGoogleSignIn = () => {
    setIsRedirecting(true);
    signIn("google", { callbackUrl: AUTH_CALLBACK_URL });
  };

  return (
    <Modal open={open} onClose={onClose} titleId="login-modal-title" showCloseButton={!isRedirecting} closeOnBackdrop={!isRedirecting}>
      {isRedirecting ? (
        <div className="py-12 px-6 flex flex-col items-center justify-center gap-4 text-slate-300">
          <Loader2 className="w-12 h-12 animate-spin text-gold" aria-hidden />
          <p className="text-lg font-medium">{t("login.redirecting")}</p>
          <p className="text-sm text-slate-500">{t("login.pleaseComplete")}</p>
        </div>
      ) : (
        <div className="pt-8 pb-6 px-6">
          <div className="text-center mb-6">
            <h2 id="login-modal-title" className="font-serif text-2xl font-bold text-white mb-1">
              {t("login.welcomeToBrand")}
            </h2>
          </div>
          <div className="space-y-3">
            <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-3.5 transition-colors">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t("login.continueWithGoogle")}
            </button>
          </div>
          <p className="mt-5 text-xs text-slate-500 text-center leading-relaxed">
            {t("login.agreeTerms")}
            <a href="/terms" className="text-gold hover:underline" onClick={onClose}>{t("login.terms")}</a>
            {t("login.and")}
            <a href="/privacy" className="text-gold hover:underline" onClick={onClose}>{t("login.privacyPolicy")}</a>.
          </p>
        </div>
      )}
    </Modal>
  );
}
