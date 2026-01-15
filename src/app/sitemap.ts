import { source } from "@/lib/source";
import { i18n } from "@/lib/i18n";
import { readdir } from "fs/promises";
import { join } from "path";
import type { MetadataRoute } from "next";

const baseUrl = "https://hytalemodding.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add all language home pages
  for (const lang of i18n.languages) {
    sitemap.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: lang === i18n.defaultLanguage ? 1.0 : 0.95,
    });
  }

  // Get all pages from source
  const pages = source.getPages();

  for (const page of pages) {
    // Skip if page doesn't have url
    if (!page.url) continue;

    sitemap.push({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  await addProjectPages(sitemap);

  return sitemap;
}

async function addProjectPages(sitemap: MetadataRoute.Sitemap) {
  const projectsPath = join(process.cwd(), "content", "projects");

  try {
    const files = await readdir(projectsPath);
    const mdxFiles = files.filter(
      (file) => file.endsWith(".mdx") && file !== "example.mdx",
    );
    for (const lang of i18n.languages) {
      sitemap.push({
        url: `${baseUrl}/${lang}/projects`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
      for (const file of mdxFiles) {
        const slug = file.replace(/\.mdx$/, "");
        sitemap.push({
          url: `${baseUrl}/${lang}/projects/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    console.error("Error reading projects for sitemap:", error);
  }
}
