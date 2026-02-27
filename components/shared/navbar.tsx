"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { LanguageSelector } from "@/components/shared/language-selector";
import { LoginModal } from "@/components/shared/login-modal";

export function Navbar() {
  const { t } = useLocale();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/edit", label: t("nav.edit") },
    { href: "/cases", label: t("nav.cases") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/gallery", label: t("nav.gallery") },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
              <span className="text-gold font-serif font-bold text-lg">F</span>
            </div>
            <span className="font-serif text-lg font-semibold text-white hidden sm:inline">Funeral Photo Editing</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            {session ? (
              <div className="flex items-center gap-2">
                <Link href="/gallery" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{session.user.name?.split(" ")[0]}</span>
                </Link>
                <button type="button" onClick={() => signOut()} className="text-slate-500 hover:text-red-400 transition-colors p-1.5" aria-label={t("nav.signOut")}>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setLoginOpen(true)} className="text-sm font-medium text-slate-950 bg-gold hover:bg-gold-light px-4 py-2 rounded-lg transition-colors">
                {t("nav.signIn")}
              </button>
            )}
            <button type="button" className="md:hidden p-1.5 text-slate-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
