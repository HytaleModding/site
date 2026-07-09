import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import { join } from "path";

type CmsBlogFile = {
  path: string;
  content: string;
  data: {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    date: string;
    author: string | null;
    authorIsAdmin: boolean;
    image: string | null;
    imageAlt: string | null;
    status: "published";
    publishedAt: string | null;
    updatedAt: string;
  };
};

type CmsBlogsResponse = {
  access: "public" | "admin";
  files: CmsBlogFile[];
};

type BlogManifestItem = CmsBlogFile["data"] & {
  path: string;
  localPath: string;
};

const cacheRoot = join(process.cwd(), ".content-cache");
const blogsCachePath = join(cacheRoot, "blogs");
const manifestPath = join(cacheRoot, "blogs.manifest.json");

function hasExistingCache() {
  return readFile(manifestPath, "utf-8")
    .then(() => true)
    .catch(() => false);
}

function isCmsBlogsResponse(value: unknown): value is CmsBlogsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as CmsBlogsResponse).files)
  );
}

function sanitizeSlug(slug: string) {
  return slug.replace(/[\\/]/g, "-");
}

function validateFile(file: CmsBlogFile) {
  return (
    typeof file?.path === "string" &&
    typeof file.content === "string" &&
    typeof file.data?.id === "string" &&
    typeof file.data.slug === "string" &&
    typeof file.data.title === "string" &&
    (typeof file.data.description === "string" ||
      file.data.description === null) &&
    typeof file.data.date === "string" &&
    (typeof file.data.author === "string" || file.data.author === null) &&
    typeof file.data.authorIsAdmin === "boolean" &&
    (typeof file.data.image === "string" || file.data.image === null) &&
    (typeof file.data.imageAlt === "string" || file.data.imageAlt === null) &&
    file.data.status === "published" &&
    (typeof file.data.publishedAt === "string" ||
      file.data.publishedAt === null) &&
    typeof file.data.updatedAt === "string"
  );
}

async function cleanStaleCachedFiles(activeSlugs: Set<string>) {
  let entries;

  try {
    entries = await readdir(blogsCachePath, { withFileTypes: true });
  } catch {
    return;
  }

  await Promise.all(
    entries.map(async (entry) => {
      if (!entry.isFile() || !entry.name.endsWith(".mdx")) return;

      const slug = entry.name.replace(/\.mdx$/, "");

      if (activeSlugs.has(slug)) return;

      await rm(join(blogsCachePath, entry.name));
    }),
  );
}

export async function syncCmsBlogs() {
  const apiUrl = process.env.CMS_BLOGS_API_URL;
  const secret = process.env.CONTENT_API_SECRET;

  if (!apiUrl) {
    console.log(
      "CMS blog sync skipped: no CMS domain or blogs API URL configured.",
    );
    return;
  }

  if (!secret) {
    console.warn(
      "CMS blog sync skipped: CONTENT_API_SECRET is not configured.",
    );
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${secret}`,
        "x-api-key": secret,
      },
    });

    if (!response.ok) {
      throw new Error(`CMS blog API returned ${response.status}`);
    }

    const json: unknown = await response.json();

    if (!isCmsBlogsResponse(json)) {
      throw new Error("CMS blog API returned an invalid response shape.");
    }

    await mkdir(blogsCachePath, { recursive: true });

    const activeSlugs = new Set<string>();
    const manifest: BlogManifestItem[] = [];

    for (const file of json.files) {
      if (!validateFile(file)) {
        console.warn("Skipping invalid CMS blog file:", file?.path);
        continue;
      }

      const slug = sanitizeSlug(file.data.slug);
      const localPath = `.content-cache/blogs/${slug}.mdx`;

      activeSlugs.add(slug);
      await writeFile(join(process.cwd(), localPath), file.content, "utf-8");

      manifest.push({
        ...file.data,
        slug,
        path: file.path,
        localPath,
      });
    }

    manifest.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    await cleanStaleCachedFiles(activeSlugs);
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

    console.log(`CMS blog sync finished: cached ${manifest.length} post(s).`);
  } catch (error) {
    if (await hasExistingCache()) {
      console.warn(
        "CMS blog sync failed. Using the existing cached blog content, which may be stale.",
        error,
      );
      return;
    }

    console.error(
      "CMS blog sync failed and no cached blog content exists.",
      error,
    );
    process.exitCode = 1;
  }
}

if (import.meta.main) {
  await syncCmsBlogs();
}
