import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AuthProvider } from "@/components/shared/auth-provider";
import { LocaleProvider } from "@/components/shared/locale-provider";
import { CookieConsentBar } from "@/components/shared/cookie-consent-bar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://funeralphotoediting.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Funeral Photo Editing — Dignified Memorial Photo Services",
    template: "%s | Funeral Photo Editing",
  },
  description:
    "Professional AI-powered memorial photo editing. Create formal portraits, colorize vintage photos, and generate memorial posters with dignity and respect.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Funeral Photo Editing — Dignified Memorial Photo Services",
    description: "AI-powered memorial photo editing — formal portraits, colorization, posters.",
    url: siteUrl,
    siteName: "Funeral Photo Editing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Funeral Photo Editing",
    description: "AI-powered memorial photo editing — formal portraits, colorization, posters.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${inter.variable} font-sans min-h-screen flex flex-col`}>
        <AuthProvider>
          <LocaleProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsentBar />
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
