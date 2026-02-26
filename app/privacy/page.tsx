import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-3xl">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
        <p>Last updated: February 2026</p>
        <h2 className="text-xl font-semibold text-white mt-8">1. Information We Collect</h2>
        <p>We collect information you provide when creating an account (email, name, profile picture via Google OAuth). We also collect uploaded photos for processing purposes only.</p>
        <h2 className="text-xl font-semibold text-white mt-8">2. How We Use Your Information</h2>
        <p>Your photos are processed by our AI system and stored securely. We never share your photos with third parties. Photos are used solely for the editing services you request.</p>
        <h2 className="text-xl font-semibold text-white mt-8">3. Data Storage</h2>
        <p>Your data is stored securely using Supabase infrastructure. Generated images are stored in your private gallery and can be deleted at any time.</p>
        <h2 className="text-xl font-semibold text-white mt-8">4. Cookies</h2>
        <p>We use essential cookies for authentication and language preferences. Analytics cookies are used with your consent to improve our services.</p>
        <h2 className="text-xl font-semibold text-white mt-8">5. Contact</h2>
        <p>For privacy inquiries, please contact us at privacy@funeralphotoediting.com.</p>
      </div>
    </div>
  );
}
