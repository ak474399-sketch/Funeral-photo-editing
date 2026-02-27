import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { BlogPostStructuredData } from "@/components/shared/structured-data";
import { notFound } from "next/navigation";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://funeralphotoediting.com";

  return (
    <div className="py-16 sm:py-24">
      <BlogPostStructuredData
        title={post.title}
        description={post.excerpt}
        date={post.date}
        author={post.author}
        url={`${siteUrl}/blog/${slug}`}
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        <article>
          <header className="mb-10">
            <p className="text-sm text-gold mb-3">{post.date}</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">{post.title}</h1>
            {post.author && <p className="text-sm text-slate-500 mt-3">By {post.author}</p>}
          </header>
          <div className="prose-funeral" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </div>
    </div>
  );
}
