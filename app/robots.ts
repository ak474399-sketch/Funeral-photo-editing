import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://funeralphotoediting.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/gallery", "/edit", "/login-success"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
