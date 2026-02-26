"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

type ReviewItem = {
  id: string;
  displayName: string;
  content: string;
  country?: string;
  createdAt: string;
  avatarUrl?: string;
};

const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    id: "f1",
    displayName: "Tanaka Y.",
    content: "母の遺影写真をAIで作成していただきました。とても自然で美しい仕上がりに、家族一同感動しました。葬儀に間に合って本当に助かりました。",
    createdAt: "",
    country: "Japan",
  },
  {
    id: "f2",
    displayName: "Sarah M.",
    content: "We only had a casual photo of my grandfather. This service transformed it into a dignified formal portrait. The quality was outstanding and it was ready within minutes.",
    createdAt: "",
    country: "United States",
  },
  {
    id: "f3",
    displayName: "陳美玲",
    content: "祖母只有一張年輕時的黑白照片，AI上色後看起來就像是昨天拍的彩色照片一樣自然。全家人都非常感動，非常感謝這個服務。",
    createdAt: "",
    country: "Taiwan",
  },
  {
    id: "f4",
    displayName: "Yamamoto K.",
    content: "父の古い写真から正式な遺影を作ることができました。背景も服装もきちんと整えていただき、お葬式にふさわしい写真になりました。",
    createdAt: "",
    country: "Japan",
  },
  {
    id: "f5",
    displayName: "David L.",
    content: "The family composite feature was incredible. We combined separate photos of our grandparents into one beautiful family portrait for the memorial service. Truly priceless.",
    createdAt: "",
    country: "Canada",
  },
  {
    id: "f6",
    displayName: "林志明",
    content: "父親的遺照需要更換正式服裝，這個AI工具完美地完成了任務。換裝效果非常自然，完全看不出是後期處理的。推薦給需要的家庭。",
    createdAt: "",
    country: "Taiwan",
  },
];

const MIN_DISPLAY_COUNT = 6;

function ensureMinReviews(reviews: ReviewItem[]): ReviewItem[] {
  if (reviews.length >= MIN_DISPLAY_COUNT) return reviews;
  const ids = new Set(reviews.map((r) => r.id));
  const extras = FALLBACK_REVIEWS.filter((r) => !ids.has(r.id));
  return [...reviews, ...extras].slice(0, MIN_DISPLAY_COUNT);
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ReviewsCarousel() {
  const { t } = useLocale();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data: ReviewItem[]) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const list = ensureMinReviews(reviews.length > 0 ? reviews : FALLBACK_REVIEWS);

  return (
    <section className="py-16 sm:py-24 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {t("reviews.title")}
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800" />
                  <div className="h-4 w-24 rounded bg-slate-800" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-slate-800" />
                  <div className="h-3 w-4/5 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {list.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-4">
                  &ldquo;{review.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  {review.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.avatarUrl}
                      alt={review.displayName}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const next = e.currentTarget.nextElementSibling;
                        if (next) (next as HTMLElement).style.display = "flex";
                      }}
                      className="w-10 h-10 rounded-full object-cover bg-slate-800 ring-1 ring-slate-700"
                    />
                  ) : null}
                  <div
                    className={`w-10 h-10 rounded-full bg-gold/20 items-center justify-center text-gold text-xs font-bold ring-1 ring-gold/30 ${review.avatarUrl ? "hidden" : "flex"}`}
                  >
                    {getInitials(review.displayName)}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white block">{review.displayName}</span>
                    {review.country && (
                      <span className="text-xs text-slate-500">{review.country}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
