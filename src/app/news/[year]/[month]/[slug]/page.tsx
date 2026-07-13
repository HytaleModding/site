import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";
import { ChevronLeftIcon, CalendarDaysIcon, UserIcon } from "lucide-react";
import { getMDXComponents } from "@/lib/mdx-components";
import { getBlog, type BlogRouteParams } from "@/lib/blogs";
import { BlogIframe, BlogImage, BlogVideo } from "@/components/mdx/blog-image";
import { blogCompiler } from "@/lib/mdx-compiler";

// Blog pages are now rendered on-demand — data comes from a fetch with
// `next: { revalidate: 60 }` inside getBlog(), not from files present at
// build time — so we don't pre-generate params. Returning [] plus
// dynamicParams=true skips build-time generation and renders each slug on
// first request, picking up new/updated CMS posts without a rebuild.
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

function formatDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<BlogRouteParams>;
}) {
  const { year, month, slug } = await params;
  const blog = await getBlog({ year, month, slug });

  if (!blog) notFound();

  const formattedDate = formatDate(blog.frontmatter.date);

  const { body: MdxContent } = await blogCompiler.compile({
    source: blog.content,
  });

  return (
    <main className="relative flex flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen overflow-hidden not-dark:hidden!">
        <Image
          src="/assets/blogs/background/sunlight-through-trees.jpg"
          alt="Background"
          fill
          className="mask mask-b-from-50% mask-b-to-transparent mask-b-to-85% object-cover opacity-10"
          priority
        />
      </div>
      <article className="container mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-12 lg:px-8">
        <Link
          href="/news"
          className="text-muted-foreground hover:text-foreground mb-10 inline-flex w-fit items-center gap-2 text-sm transition-colors"
        >
          <ChevronLeftIcon className="size-4" />
          Back to News
        </Link>

        <ViewTransition name="hero" share="blur-scale-transition">
          <header className="space-y-5">
            <ViewTransition
              name={`blog-${year}-${month}-${slug}`}
              share="blur-scale-transition"
            >
              <div className="space-y-5">
                <h1 className="text-3xl font-semibold text-balance md:text-5xl">
                  {blog.frontmatter.title}
                </h1>
                <p className="text-muted-foreground text-xl text-pretty md:text-2xl">
                  {blog.frontmatter.description}
                </p>
                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDaysIcon className="size-4" />
                      {formattedDate}
                    </span>
                  )}
                  {blog.frontmatter.author && (
                    <span className="inline-flex items-center gap-1.5">
                      <UserIcon className="size-4" />
                      {blog.frontmatter.author}
                    </span>
                  )}
                </div>
              </div>
            </ViewTransition>
          </header>
        </ViewTransition>

        {blog.frontmatter.image && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl border shadow-sm">
            <Image
              src={blog.frontmatter.image}
              alt={blog.frontmatter.imageAlt ?? blog.frontmatter.title}
              fill
              sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="border-fd-border my-8 border-t" />

        <DocsBody className="max-w-none text-[1.125rem] leading-8">
          <MdxContent
            components={getMDXComponents({
              iframe: BlogIframe,
              img: BlogImage,
              video: BlogVideo,
            })}
          />
        </DocsBody>
      </article>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogRouteParams>;
}): Promise<Metadata> {
  const { year, month, slug } = await params;
  const blog = await getBlog({ year, month, slug });

  if (!blog) notFound();

  const title = `${blog.frontmatter.title} | HytaleModding`;
  const description =
    blog.frontmatter.description !== undefined
      ? blog.frontmatter.description
      : blog.content.slice(0, 160).replace(/\n/g, " ") + "...";
  const url = `/news/${year}/${month}/${slug}`;
  const image = blog.frontmatter.image;

  return {
    title,
    description,
    openGraph: {
      title: blog.frontmatter.title,
      description,
      url,
      type: "article",
      siteName: "HytaleModding",
      publishedTime: blog.frontmatter.date,
      authors: blog.frontmatter.author ? [blog.frontmatter.author] : undefined,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: blog.frontmatter.imageAlt ?? blog.frontmatter.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: blog.frontmatter.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
