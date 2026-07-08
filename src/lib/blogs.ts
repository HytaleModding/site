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
  return join(blogsPath, params.year, params.month, `${params.slug}${extension}`);
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

export async function getBlogs(): Promise<BlogOverview[]> {
  try {
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
          image: data.image,
          imageAlt: data.imageAlt,
        };
      }),
    );

    return blogs
      .filter((blog): blog is BlogOverview => blog !== null)
      .sort((a, b) => {
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
    const files = await collectMarkdownFiles(blogsPath);

    return files
      .map(getRelativeBlogPath)
      .map(getRouteParams)
      .filter((params): params is BlogRouteParams => params !== null);
  } catch (error) {
    console.error("Error reading blog slugs:", error);
    return [];
  }
}
