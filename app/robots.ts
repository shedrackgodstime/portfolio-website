// app/robots.ts
import { getSeoInfo } from "@/lib/data";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
      const seo = getSeoInfo();
      const baseUrl = seo.siteUrl;
  return {
    rules: {
      userAgent: "*", 
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
