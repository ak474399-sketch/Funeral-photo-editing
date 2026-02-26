import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-3xl">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-8">Terms of Service</h1>
      <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
        <p>Last updated: February 2026</p>
        <h2 className="text-xl font-semibold text-white mt-8">1. Acceptance</h2>
        <p>By using Funeral Photo Editing, you agree to these terms. Our services are designed to help families create dignified memorial photographs.</p>
        <h2 className="text-xl font-semibold text-white mt-8">2. Services</h2>
        <p>We provide AI-powered photo editing services specifically for memorial and funeral photography. All editing is performed by artificial intelligence and results may vary.</p>
        <h2 className="text-xl font-semibold text-white mt-8">3. Purchases</h2>
        <p>All purchases are one-time payments. Due to the nature of digital services, refunds are handled on a case-by-case basis. Contact support within 7 days of purchase for refund requests.</p>
        <h2 className="text-xl font-semibold text-white mt-8">4. User Content</h2>
        <p>You retain all rights to photos you upload. By using our service, you grant us a limited license to process your images for the purpose of providing our services.</p>
        <h2 className="text-xl font-semibold text-white mt-8">5. Respectful Use</h2>
        <p>Our services are intended for respectful memorial photo preparation. Any misuse of our services for inappropriate purposes will result in account termination.</p>
      </div>
    </div>
  );
}
