import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ChevronLeftIcon, CalendarDaysIcon, UserIcon } from "lucide-react";
import { getMDXComponents } from "@/lib/mdx-components";
import { getBlog, getBlogSlugs } from "@/lib/blogs";

function formatDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return {
    title: `${blog.frontmatter.title} | Hytale Modding`,
    description: blog.frontmatter.description,
  };
}

export default async function BlogPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  const formattedDate = formatDate(blog.frontmatter.date);

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
          href="/blogs"
          className="text-muted-foreground hover:text-foreground mb-10 inline-flex w-fit items-center gap-2 text-sm transition-colors"
        >
          <ChevronLeftIcon className="size-4" />
          Back to Blogs
        </Link>

        <ViewTransition name="hero" share="blur-scale-transition">
          <header className="space-y-5">
            <ViewTransition name={`blog-${slug}`} share="blur-scale-transition">
              <div className="space-y-5">
                <h1 className="text-4xl font-semibold text-balance md:text-6xl">
                  {blog.frontmatter.title}
                </h1>
                <p className="text-muted-foreground text-lg text-pretty md:text-xl">
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

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={blog.content} components={getMDXComponents()} />
        </div>
      </article>
    </main>
  );
}
