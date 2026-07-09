import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

const blogFilenamePattern = /^(\d{4})-(\d{2})-(.+)$/;
const blogFolderPattern = /^(\d{4})[\\/](\d{2})[\\/](.+)$/;

export type BlogFrontmatter = {
  title: string;
  description: string;
  date?: string;
  author?: string;
  authorIsAdmin?: boolean;
  image?: string;
  imageAlt?: string;
};

export type BlogOverview = BlogFrontmatter & {
  year: string;
  month: string;
  slug: string;
  path: string;
};

export type BlogRouteParams = {
  year: string;
  month: string;
  slug: string;
};

const blogsPath = join(process.cwd(), "content", "blogs");


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

function isCmsBlogsResponse(value: unknown): value is CmsBlogsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as CmsBlogsResponse).files)
  );
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

/**
 * Fetches the CMS blog bulk endpoint directly, relying on Next.js's Data
 * Cache for staleness rather than a build-time file sync. `revalidate: 60`
 * means: serve the cached response instantly if it's under 60s old; if it's
 * older, still serve it instantly but kick off a background refetch so the
 * *next* request gets fresh data. Tagged so it could be force-revalidated
 * later (e.g. `revalidateTag("cms-blogs")`) without needing that right now.
 */
async function fetchCmsBlogs(): Promise<CmsBlogFile[]> {
  const apiUrl = process.env.CMS_BLOGS_API_URL;
  const secret = process.env.CONTENT_API_SECRET;

  if (!apiUrl || !secret) {
    return [];
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${secret}`,
        "x-api-key": secret,
      },
      next: {
        revalidate: 60,
        tags: ["cms-blogs"],
      },
    });

    if (!response.ok) {
      console.error(`CMS blog API returned ${response.status}`);
      return [];
    }

    const json: unknown = await response.json();

    if (!isCmsBlogsResponse(json)) {
      console.error("CMS blog API returned an invalid response shape.");
      return [];
    }

    return json.files.filter((file) => {
      const valid = validateFile(file);
      if (!valid) console.warn("Skipping invalid CMS blog file:", file?.path);
      return valid;
    });
  } catch (error) {
    console.error("Error fetching CMS blogs:", error);
    return [];
  }
}

function sanitizeSlug(slug: string) {
  return slug.replace(/[\\/]/g, "-");
}

function getRouteParamsFromCms(file: CmsBlogFile): BlogRouteParams | null {
  const match = file.data.date.match(/^(\d{4})-(\d{2})/);

  if (!match) return null;

  return {
    year: match[1],
    month: match[2],
    slug: sanitizeSlug(file.data.slug),
  };
}

function toBlogFrontmatter(
  file: CmsBlogFile,
  data: Record<string, unknown> = {},
): BlogFrontmatter {
  return {
    title:
      file.data.title ||
      (typeof data.title === "string" ? data.title : undefined) ||
      file.data.slug,
    description:
      file.data.description ||
      (typeof data.description === "string" ? data.description : undefined) ||
      "",
    date:
      file.data.date ||
      (typeof data.date === "string" ? data.date : undefined),
    author:
      file.data.author ||
      (typeof data.author === "string" ? data.author : undefined) ||
      undefined,
    authorIsAdmin:
      file.data.authorIsAdmin ??
      (typeof data.authorIsAdmin === "boolean"
        ? data.authorIsAdmin
        : undefined),
    image:
      file.data.image ||
      (typeof data.image === "string" ? data.image : undefined) ||
      undefined,
    imageAlt:
      file.data.imageAlt ||
      (typeof data.imageAlt === "string" ? data.imageAlt : undefined) ||
      undefined,
  };
}


function getSlug(file: string) {
  return file.replace(/\.mdx?$/, "");
}

function getRouteParams(relativePath: string): BlogRouteParams | null {
  const flatMatch = getSlug(relativePath).match(blogFilenamePattern);

  if (flatMatch) {
    return {
      year: flatMatch[1],
      month: flatMatch[2],
      slug: flatMatch[3],
    };
  }

  const folderMatch = getSlug(relativePath).match(blogFolderPattern);

  if (!folderMatch) return null;

  return {
    year: folderMatch[1],
    month: folderMatch[2],
    slug: folderMatch[3],
  };
}

function getBlogPath(params: BlogRouteParams) {
  return `/news/${params.year}/${params.month}/${params.slug}`;
}

function getBlogFilePath(params: BlogRouteParams, extension: ".md" | ".mdx") {
  return join(
    blogsPath,
    params.year,
    params.month,
    `${params.slug}${extension}`,
  );
}

async function collectMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(fullPath)));
      continue;
    }

    if (isMarkdownFile(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function getRelativeBlogPath(filePath: string) {
  return filePath.slice(blogsPath.length + 1);
}

function isMarkdownFile(file: string) {
  return file.endsWith(".md") || file.endsWith(".mdx");
}

async function getLocalBlogs(): Promise<BlogOverview[]> {
  let files: string[];

  try {
    files = await collectMarkdownFiles(blogsPath);
  } catch {
    return [];
  }

  const blogs: Array<BlogOverview | null> = await Promise.all(
    files.map(async (filePath) => {
      const params = getRouteParams(getRelativeBlogPath(filePath));

      if (!params) return null;

      const source = await readFile(filePath, "utf-8");
      const { data } = matter(source);

      return {
        ...params,
        path: getBlogPath(params),
        title: data.title || params.slug,
        description: data.description || "",
        date: data.date,
        author: data.author,
        authorIsAdmin: data.authorIsAdmin,
        image: data.image,
        imageAlt: data.imageAlt,
      };
    }),
  );

  return blogs.filter((blog): blog is BlogOverview => blog !== null);
}

function mergeBlogs(blogs: BlogOverview[]) {
  const seen = new Set<string>();
  const merged: BlogOverview[] = [];

  for (const blog of blogs) {
    const key = `${blog.year}/${blog.month}/${blog.slug}`;

    if (seen.has(key)) continue;

    seen.add(key);
    merged.push(blog);
  }

  return merged;
}


export async function getBlogs(): Promise<BlogOverview[]> {
  try {
    const [cmsFiles, localBlogs] = await Promise.all([
      fetchCmsBlogs(),
      getLocalBlogs(),
    ]);

    const cmsBlogs = cmsFiles
      .map((file): BlogOverview | null => {
        const params = getRouteParamsFromCms(file);

        if (!params) return null;

        return {
          ...params,
          path: getBlogPath(params),
          title: file.data.title || params.slug,
          description: file.data.description || "",
          date: file.data.date,
          author: file.data.author || undefined,
          authorIsAdmin: file.data.authorIsAdmin,
          image: file.data.image || undefined,
          imageAlt: file.data.imageAlt || undefined,
        };
      })
      .filter((blog): blog is BlogOverview => blog !== null);

    return mergeBlogs([...cmsBlogs, ...localBlogs]).sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;

      return bTime - aTime;
    });
  } catch (error) {
    console.error("Error reading blogs:", error);
    return [];
  }
}

export async function getBlog(params: BlogRouteParams) {
  const cmsFiles = await fetchCmsBlogs();
  const cmsFile = cmsFiles.find((file) => {
    const cmsParams = getRouteParamsFromCms(file);

    return (
      cmsParams?.year === params.year &&
      cmsParams.month === params.month &&
      cmsParams.slug === params.slug
    );
  });

  if (cmsFile) {
    const { data, content } = matter(cmsFile.content);

    return {
      content,
      frontmatter: toBlogFrontmatter(cmsFile, data),
    };
  }

  const files = [
    getBlogFilePath(params, ".mdx"),
    getBlogFilePath(params, ".md"),
    join(blogsPath, `${params.year}-${params.month}-${params.slug}.mdx`),
    join(blogsPath, `${params.year}-${params.month}-${params.slug}.md`),
  ];

  for (const file of files) {
    try {
      const source = await readFile(file, "utf-8");
      const { data, content } = matter(source);

      return {
        content,
        frontmatter: {
          title: data.title || params.slug,
          description: data.description || "",
          date: data.date,
          author: data.author,
          authorIsAdmin: data.authorIsAdmin,
          image: data.image,
          imageAlt: data.imageAlt,
        } as BlogFrontmatter,
      };
    } catch {
      // Try the next supported markdown extension.
    }
  }

  return null;
}

export async function getBlogSlugs(): Promise<BlogRouteParams[]> {
  try {
    const [cmsFiles, localFiles] = await Promise.all([
      fetchCmsBlogs(),
      collectMarkdownFiles(blogsPath).catch(() => [] as string[]),
    ]);

    const cmsSlugs = cmsFiles
      .map(getRouteParamsFromCms)
      .filter((params): params is BlogRouteParams => params !== null);
    const localSlugs = localFiles
      .map(getRelativeBlogPath)
      .map(getRouteParams)
      .filter((params): params is BlogRouteParams => params !== null);

    const seen = new Set<string>();

    return [...cmsSlugs, ...localSlugs].filter((params) => {
      const key = `${params.year}/${params.month}/${params.slug}`;

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });
  } catch (error) {
    console.error("Error reading blog slugs:", error);
    return [];
  }
}