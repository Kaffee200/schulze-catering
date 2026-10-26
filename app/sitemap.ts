import type { MetadataRoute } from "next";
import { anlaesse } from "@/data/anlaesse";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/anfrage", "/kontakt", "/anlaesse", "/faq", ...anlaesse.map((a) => `/anlaesse/${a.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
