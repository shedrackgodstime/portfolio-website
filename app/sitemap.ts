// app/sitemap.ts
import type { MetadataRoute } from "next";
import { projects, getSeoInfo } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const seo = getSeoInfo();
  const baseUrl = seo.siteUrl;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "yearly", priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
