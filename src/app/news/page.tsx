import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";
import { getBlogs } from "@/lib/blogs";

// Revalidation happens at the fetch call inside getBlogs().
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
      <div className="blogs-hytale-background pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-screen overflow-hidden">
        <Image
          src="/assets/blogs/background/sunlight-through-trees.jpg"
          alt=""
          fill
          className="mask mask-b-from-50% mask-b-to-transparent mask-b-to-85% object-cover opacity-[0.07]"
          priority
        />
      </div>

      <div className="container mx-auto flex w-full flex-1 flex-col px-6 py-16 lg:px-12 lg:py-20">
        <ViewTransition name="hero" share="blur-scale-transition">
          <div className="mx-auto max-w-4xl space-y-4 text-center">
            <h1 className="font-display text-4xl leading-normal font-semibold text-balance md:text-6xl">
              HytaleModding News
            </h1>
            <p className="text-muted-foreground text-lg text-balance md:text-xl">
              News, guides, and community updates from the world of Hytale
              modding.
            </p>
          </div>
        </ViewTransition>

        <div className="mx-auto mt-14 grid w-full max-w-6xl gap-4">
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
                  className="group bg-fd-card/80 hover:bg-fd-card/90 blogs-card block overflow-hidden rounded-xl border p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-px hover:shadow-lg focus:ring-2 focus:outline-none md:p-6"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between">
                    <div className="flex flex-1 flex-col justify-between gap-5">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-balance transition-colors group-hover:text-(--color-fd-primary)">
                          {blog.title}
                        </h2>
                        <p className="text-muted-foreground leading-7 text-pretty">
                          {blog.description}
                        </p>
                      </div>

                      <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                        {formattedDate && (
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDaysIcon className="size-4" />
                            {formattedDate}
                          </span>
                        )}
                        {blog.author && (
                          <span className="blogs-author">By {blog.author}</span>
                        )}
                      </div>
                    </div>

                    {blog.image && (
                      <div className="relative min-h-44 w-full overflow-hidden rounded-lg border border-white/10 md:min-h-0 md:w-56 md:shrink-0">
                        <Image
                          src={blog.image}
                          alt={blog.imageAlt ?? blog.title}
                          fill
                          sizes="(min-width: 768px) 224px, calc(100vw - 88px)"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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
