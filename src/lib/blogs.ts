import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
};

export type BlogOverview = BlogFrontmatter & {
  slug: string;
};

const blogsPath = join(process.cwd(), "content", "blogs");

function getSlug(file: string) {
  return file.replace(/\.mdx?$/, "");
}

function isMarkdownFile(file: string) {
  return file.endsWith(".md") || file.endsWith(".mdx");
}

export async function getBlogs(): Promise<BlogOverview[]> {
  try {
    const files = await readdir(blogsPath);
    const blogs = await Promise.all(
      files.filter(isMarkdownFile).map(async (file) => {
        const source = await readFile(join(blogsPath, file), "utf-8");
        const { data } = matter(source);
        const slug = getSlug(file);

        return {
          slug,
          title: data.title || slug,
          description: data.description || "",
          date: data.date,
          author: data.author,
          image: data.image,
          imageAlt: data.imageAlt,
        };
      }),
    );

    return blogs.sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;

      return bTime - aTime;
    });
  } catch (error) {
    console.error("Error reading blogs:", error);
    return [];
  }
}

export async function getBlog(slug: string) {
  const files = [`${slug}.mdx`, `${slug}.md`];

  for (const file of files) {
    try {
      const source = await readFile(join(blogsPath, file), "utf-8");
      const { data, content } = matter(source);

      return {
        content,
        frontmatter: {
          title: data.title || slug,
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

export async function getBlogSlugs() {
  try {
    const files = await readdir(blogsPath);

    return files.filter(isMarkdownFile).map(getSlug);
  } catch (error) {
    console.error("Error reading blog slugs:", error);
    return [];
  }
}
