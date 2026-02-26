"use client";

/**
 * Minimal white lily SVG decorations — subtle, solemn, and elegant.
 * Used as corner/section ornaments throughout the site.
 */

export function LilyLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Stem */}
      <path d="M60 200 C60 160, 55 120, 58 80 C60 60, 62 40, 60 20" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      {/* Left petal */}
      <path d="M58 80 C40 60, 15 50, 10 30 C8 20, 20 15, 35 25 C45 32, 52 50, 58 80Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.5" />
      {/* Right petal */}
      <path d="M62 80 C80 60, 105 50, 110 30 C112 20, 100 15, 85 25 C75 32, 68 50, 62 80Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.5" />
      {/* Center petal */}
      <path d="M60 80 C55 55, 50 30, 55 10 C58 2, 62 2, 65 10 C70 30, 65 55, 60 80Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="0.5" />
      {/* Stamen dots */}
      <circle cx="52" cy="65" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="60" cy="60" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="68" cy="65" r="1" fill="currentColor" opacity="0.2" />
      {/* Leaf */}
      <path d="M58 140 C40 130, 25 115, 20 100 C30 108, 45 120, 58 140Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export function LilyRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={`scale-x-[-1] ${className}`} aria-hidden="true">
      <path d="M60 200 C60 160, 55 120, 58 80 C60 60, 62 40, 60 20" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <path d="M58 80 C40 60, 15 50, 10 30 C8 20, 20 15, 35 25 C45 32, 52 50, 58 80Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.5" />
      <path d="M62 80 C80 60, 105 50, 110 30 C112 20, 100 15, 85 25 C75 32, 68 50, 62 80Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.5" />
      <path d="M60 80 C55 55, 50 30, 55 10 C58 2, 62 2, 65 10 C70 30, 65 55, 60 80Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="52" cy="65" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="60" cy="60" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="68" cy="65" r="1" fill="currentColor" opacity="0.2" />
      <path d="M62 140 C80 130, 95 115, 100 100 C90 108, 75 120, 62 140Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export function LilyDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold/30" />
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gold/40">
        {/* Small lily bud */}
        <path d="M20 35 C20 28, 18 20, 19 12 C19.5 8, 20.5 8, 21 12 C22 20, 20 28, 20 35Z" fill="currentColor" opacity="0.5" />
        <path d="M19 12 C14 8, 8 7, 6 4 C8 5, 14 6, 19 12Z" fill="currentColor" opacity="0.3" />
        <path d="M21 12 C26 8, 32 7, 34 4 C32 5, 26 6, 21 12Z" fill="currentColor" opacity="0.3" />
      </svg>
      <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  );
}
