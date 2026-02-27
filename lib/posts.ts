import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  contentHtml: string;
};

export type PostMeta = Omit<Post, "contentHtml">;

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(POSTS_DIR, `${slug}.md`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        excerpt: (data.excerpt as string) ?? "",
        coverImage: data.coverImage as string | undefined,
        author: data.author as string | undefined,
        tags: data.tags as string[] | undefined,
      };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const { remark } = await import("remark");
  const remarkHtml = (await import("remark-html")).default;
  const result = await remark().use(remarkHtml, { sanitize: false }).process(content);

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    coverImage: data.coverImage as string | undefined,
    author: data.author as string | undefined,
    tags: data.tags as string[] | undefined,
    contentHtml: result.toString(),
  };
}
