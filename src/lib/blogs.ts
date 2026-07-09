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
const blogCacheManifestPath = join(
  process.cwd(),
  ".content-cache",
  "blogs.manifest.json",
);

type CachedBlogManifestItem = {
  id: string;
  slug: string;
  path: string;
  localPath: string;
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

async function readCachedBlogManifest(): Promise<CachedBlogManifestItem[]> {
  try {
    const source = await readFile(blogCacheManifestPath, "utf-8");
    const manifest = JSON.parse(source);

    if (!Array.isArray(manifest)) return [];

    return manifest.filter((item): item is CachedBlogManifestItem => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof item.slug === "string" &&
        typeof item.localPath === "string" &&
        typeof item.date === "string"
      );
    });
  } catch {
    return [];
  }
}

function getRouteParamsFromDate(
  item: CachedBlogManifestItem,
): BlogRouteParams | null {
  const match = item.date.match(/^(\d{4})-(\d{2})/);

  if (!match) return null;

  return {
    year: match[1],
    month: match[2],
    slug: item.slug,
  };
}

function toBlogFrontmatter(
  item: CachedBlogManifestItem,
  data: Record<string, unknown> = {},
): BlogFrontmatter {
  return {
    title:
      item.title ||
      (typeof data.title === "string" ? data.title : undefined) ||
      item.slug,
    description:
      item.description ||
      (typeof data.description === "string" ? data.description : undefined) ||
      "",
    date: item.date || (typeof data.date === "string" ? data.date : undefined),
    author:
      item.author ||
      (typeof data.author === "string" ? data.author : undefined),
    authorIsAdmin:
      item.authorIsAdmin ??
      (typeof data.authorIsAdmin === "boolean"
        ? data.authorIsAdmin
        : undefined),
    image:
      item.image || (typeof data.image === "string" ? data.image : undefined),
    imageAlt:
      item.imageAlt ||
      (typeof data.imageAlt === "string" ? data.imageAlt : undefined),
  };
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

async function getCachedBlogs(): Promise<BlogOverview[]> {
  const manifest = await readCachedBlogManifest();
  const blogs: BlogOverview[] = [];

  for (const item of manifest) {
    const params = getRouteParamsFromDate(item);

    if (!params) continue;

    blogs.push({
      ...params,
      path: getBlogPath(params),
      title: item.title || params.slug,
      description: item.description || "",
      date: item.date,
      author: item.author || undefined,
      authorIsAdmin: item.authorIsAdmin,
      image: item.image || undefined,
      imageAlt: item.imageAlt || undefined,
    });
  }

  return blogs;
}

async function getLocalBlogs(): Promise<BlogOverview[]> {
  const files = await collectMarkdownFiles(blogsPath);
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

export async function getBlogs(): Promise<BlogOverview[]> {
  try {
    const blogs = [...(await getCachedBlogs()), ...(await getLocalBlogs())];

    return mergeBlogs(blogs).sort((a, b) => {
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
  const manifest = await readCachedBlogManifest();
  const cachedItem = manifest.find((item) => {
    const cachedParams = getRouteParamsFromDate(item);

    return (
      cachedParams?.year === params.year &&
      cachedParams.month === params.month &&
      cachedParams.slug === params.slug
    );
  });

  if (cachedItem) {
    try {
      const source = await readFile(
        join(process.cwd(), cachedItem.localPath),
        "utf-8",
      );
      const { data, content } = matter(source);

      return {
        content,
        frontmatter: toBlogFrontmatter(cachedItem, data),
      };
    } catch (error) {
      console.warn("Error reading cached blog:", cachedItem.slug, error);
    }
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
    const cachedSlugs = (await readCachedBlogManifest())
      .map(getRouteParamsFromDate)
      .filter((params): params is BlogRouteParams => params !== null);
    const files = await collectMarkdownFiles(blogsPath);
    const localSlugs = files
      .map(getRelativeBlogPath)
      .map(getRouteParams)
      .filter((params): params is BlogRouteParams => params !== null);

    const seen = new Set<string>();

    return [...cachedSlugs, ...localSlugs].filter((params) => {
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
