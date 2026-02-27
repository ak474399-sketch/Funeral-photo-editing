import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { LilyDivider } from "@/components/shared/lily-decoration";

export const metadata: Metadata = {
  title: "Blog — Memorial Photo Guides & Stories",
  description: "Guides, stories, and resources about memorial photo preparation, honoring heritage, and preserving family memories.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Blog</h1>
          <LilyDivider className="mt-4 mb-3" />
          <p className="text-slate-400 text-lg">Guides and stories about honoring heritage through photography</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-slate-500">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 hover:border-gold/30 hover:bg-slate-900/60 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gold mb-2">{post.date}</p>
                    <h2 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors mb-2">{post.title}</h2>
                    <p className="text-sm text-slate-400 line-clamp-2">{post.excerpt}</p>
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
