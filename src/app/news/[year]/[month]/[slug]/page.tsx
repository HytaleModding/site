import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
} from "lucide-react";
import { getMDXComponents } from "@/lib/mdx-components";
import { getBlog, getBlogs, type BlogRouteParams } from "@/lib/blogs";
import { BlogIframe, BlogImage, BlogVideo } from "@/components/mdx/blog-image";
import { blogCompiler } from "@/lib/mdx-compiler";
import { baseUrl } from "@/lib/config";
import { BlogShareActions } from "@/components/blog-share-actions";

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
  const [blog, blogs] = await Promise.all([
    getBlog({ year, month, slug }),
    getBlogs(),
  ]);

  if (!blog) notFound();

  const currentPath = `/news/${year}/${month}/${slug}`;
  const currentIndex = blogs.findIndex((item) => item.path === currentPath);
  const newerBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const olderBlog =
    currentIndex >= 0 && currentIndex < blogs.length - 1
      ? blogs[currentIndex + 1]
      : null;

  const formattedDate = formatDate(blog.frontmatter.date);
  const publishedDate = blog.frontmatter.date?.slice(0, 10);
  const absoluteUrl = new URL(
    currentPath,
    baseUrl,
  ).toString();
  const absoluteImage = blog.frontmatter.image
    ? new URL(blog.frontmatter.image, baseUrl).toString()
    : undefined;
  const dateModified =
    blog.frontmatter.dateModified?.slice(0, 10) ?? publishedDate;
  const authorName = blog.frontmatter.author || "HytaleModding";
  const authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const { body: MdxContent } = await blogCompiler.compile({
    source: blog.content,
  });
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.frontmatter.title,
    description: blog.frontmatter.description,
    ...(absoluteImage ? { image: absoluteImage } : {}),
    ...(publishedDate ? { datePublished: publishedDate } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Person",
      name: authorName,
      url: new URL(`/authors/${authorSlug}`, baseUrl).toString(),
    },
    publisher: {
      "@type": "Organization",
      name: "HytaleModding",
      logo: {
        "@type": "ImageObject",
        url: new URL("/og.png", baseUrl).toString(),
      },
    },
    mainEntityOfPage: absoluteUrl,
  };

  return (
    <main className="relative flex flex-1 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="blogs-hytale-background pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-screen overflow-hidden">
        <Image
          src="/assets/blogs/background/sunlight-through-trees.jpg"
          alt=""
          fill
          className="mask mask-b-from-50% mask-b-to-transparent mask-b-to-85% object-cover opacity-[0.07]"
          priority
        />
      </div>
      <article className="container mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12 lg:px-8">
        <Link
          href="/news"
          className="text-muted-foreground hover:text-foreground mb-10 inline-flex w-fit items-center gap-2 text-sm transition-colors"
        >
          <ChevronLeftIcon className="size-4" />
          Back to News
        </Link>

        <ViewTransition name="hero" share="blur-scale-transition">
          <header className="blogs-post-header space-y-5">
            <ViewTransition
              name={`blog-${year}-${month}-${slug}`}
              share="blur-scale-transition"
            >
              <div className="space-y-5">
                <h1 className="font-display text-3xl font-semibold text-balance md:text-5xl">
                  {blog.frontmatter.title}
                </h1>
                <p className="text-muted-foreground text-xl text-pretty md:text-2xl">
                  {blog.frontmatter.description}
                </p>
                <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDaysIcon className="size-4" />
                      <time dateTime={publishedDate}>{formattedDate}</time>
                    </span>
                  )}
                  <span className="blogs-author">By {authorName}</span>
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

        <footer className="mt-12 border-t pt-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold">Share this post</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Send it to someone who might find it useful.
              </p>
            </div>
            <BlogShareActions title={blog.frontmatter.title} url={absoluteUrl} />
          </div>

          {(newerBlog || olderBlog) && (
            <nav
              className="mt-8 grid gap-4 sm:grid-cols-2"
              aria-label="More news"
            >
              {newerBlog ? (
                <Link
                  href={newerBlog.path}
                  className="group bg-fd-card/70 hover:bg-fd-card rounded-xl border p-5 transition-colors"
                >
                  <span className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                    <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-1" />
                    Newer post
                  </span>
                  <span className="mt-2 block font-semibold text-balance">
                    {newerBlog.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {olderBlog && (
                <Link
                  href={olderBlog.path}
                  className="group bg-fd-card/70 hover:bg-fd-card rounded-xl border p-5 text-right transition-colors"
                >
                  <span className="text-muted-foreground flex items-center justify-end gap-2 text-xs font-bold tracking-wider uppercase">
                    Older post
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 block font-semibold text-balance">
                    {olderBlog.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </footer>
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
  const absoluteUrl = new URL(url, baseUrl).toString();
  const absoluteImage = image
    ? new URL(image, baseUrl).toString()
    : undefined;
  const datePublished = blog.frontmatter.date?.slice(0, 10);
  const dateModified =
    blog.frontmatter.dateModified?.slice(0, 10) ?? datePublished;
  const authorName = blog.frontmatter.author || "HytaleModding";
  const authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return {
    title,
    description,
    alternates: { canonical: url },
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
