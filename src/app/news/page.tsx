import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon, UserIcon } from "lucide-react";
import { getBlogs } from "@/lib/blogs";

function formatDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function NewsPage() {
  const blogs = await getBlogs();

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
      <div className="container mx-auto flex w-full flex-1 flex-col px-6 py-20 lg:px-12">
        <ViewTransition name="hero" share="blur-scale-transition">
          <div className="mx-auto max-w-3xl space-y-5 text-center">
            <h1 className="text-4xl leading-normal font-semibold text-balance md:text-6xl">
              HytaleModding News
            </h1>
            <p className="text-muted-foreground text-lg text-balance md:text-xl">
              News, guides, and community updates from the world of Hytale
              modding.
            </p>
          </div>
        </ViewTransition>

        <div className="mx-auto mt-16 grid w-full max-w-5xl gap-5">
          {blogs.map((blog) => {
            const formattedDate = formatDate(blog.date);

            return (
              <ViewTransition
                key={blog.path}
                name={`blog-${blog.year}-${blog.month}-${blog.slug}`}
                share="blur-scale-transition"
              >
                <Link
                  href={blog.path}
                  className="group bg-fd-card/80 hover:bg-fd-card/60 block overflow-hidden rounded-xl border p-6 shadow-sm backdrop-blur-3xl transition-all hover:shadow-lg focus:ring-2 focus:outline-none"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between">
                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-balance transition-colors group-hover:text-(--color-hytale-gold-light)">
                          {blog.title}
                        </h2>
                        <p className="text-muted-foreground max-w-3xl text-pretty">
                          {blog.description}
                        </p>
                      </div>
                      <div className="text-muted-foreground flex flex-wrap gap-3 text-sm">
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
      </div>
    </main>
  );
}