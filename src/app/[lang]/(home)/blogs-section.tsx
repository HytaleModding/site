import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { type BlogOverview } from "@/lib/blogs";

function formatDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogsSection({
  blogs,
  lang,
  title,
}: {
  blogs: BlogOverview[];
  lang: string;
  title: string;
}) {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto flex w-full flex-col px-6 py-20 lg:px-12">
      <SectionHeader title={title} />

      <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-5">
        {blogs.map((blog) => {
          const formattedDate = formatDate(blog.date);

          return (
            <ViewTransition
              key={blog.path}
              name={`home-blog-${blog.year}-${blog.month}-${blog.slug}`}
              share="blur-scale-transition"
            >
              <Link
                href={blog.path}
                className="group bg-card block overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-lg focus:ring-2 focus:outline-none"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between">
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <h3 className="font-display text-2xl font-bold text-balance">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground max-w-3xl text-pretty">
                        {blog.description}
                      </p>
                    </div>
                    <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-sm">
                      {formattedDate && (
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDaysIcon className="size-4" />
                          {formattedDate}
                        </span>
                      )}
                      {blog.author && (
                        <span className="inline-flex items-center gap-1.5">
                          <UserIcon className="size-4" />
                          {blog.author}
                        </span>
                      )}
                    </div>
                  </div>
                  {blog.image && (
                    <div className="relative min-h-44 w-full overflow-hidden rounded-lg border md:min-h-0 md:w-56 md:shrink-0">
                      <Image
                        src={blog.image}
                        alt={blog.imageAlt ?? blog.title}
                        fill
                        sizes="(min-width: 768px) 224px, calc(100vw - 96px)"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </Link>
            </ViewTransition>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild>
          <Link href="/news">Read more</Link>
        </Button>
      </div>
    </section>
  );
}
