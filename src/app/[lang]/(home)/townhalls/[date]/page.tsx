import type { ComponentProps } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ExternalLinkIcon,
  FileTextIcon,
} from "lucide-react";
import { DeferredYouTubeEmbed } from "@/components/deferred-youtube-embed";
import { Footer } from "../../footer";
import { TownHallParticipants } from "@/components/townhall-participants";
import { TownHallQuestion } from "@/components/mdx/townhall-question";
import { getMDXComponents } from "@/lib/mdx-components";
import { contentCompiler } from "@/lib/mdx-compiler";
import { getTownHallReport } from "@/lib/townhall-reports";

type ReportPageParams = {
  lang: string;
  date: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function townHallsPath(locale: string) {
  return locale === "en" ? "/townhalls" : `/${locale}/townhalls`;
}

export default async function TownHallReportPage({
  params,
}: {
  params: Promise<ReportPageParams>;
}) {
  const { lang, date } = await params;
  const report = await getTownHallReport(date);

  if (!report) notFound();

  const { body: MdxContent, toc } = await contentCompiler.compile({
    source: report.content,
  });
  const formattedDate = formatDate(report.townHall.date);
  const youtubeUrl = `https://www.youtube.com/watch?v=${report.townHall.videoId}`;

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Link
            href={townHallsPath(lang)}
            className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            All town halls
          </Link>

          <header className="max-w-4xl">
            <div className="text-muted-foreground mb-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="border-border bg-muted inline-flex items-center gap-2 rounded-full border px-3 py-1 font-semibold tracking-wide uppercase">
                <FileTextIcon className="size-3.5" />
                Town hall report
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDaysIcon className="size-4" />
                <time dateTime={report.frontmatter.date}>{formattedDate}</time>
              </span>
            </div>

            <h1 className="font-display text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              {report.frontmatter.title}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-3xl text-lg leading-8 text-pretty sm:text-xl">
              {report.frontmatter.description}
            </p>
          </header>

          <div className="border-border relative mt-10 aspect-video w-full overflow-hidden rounded-2xl border bg-black shadow-2xl shadow-black/25">
            <DeferredYouTubeEmbed
              videoId={report.townHall.videoId}
              title={`${report.frontmatter.title} recording`}
            />
          </div>

          <div className="mt-6">
            <TownHallParticipants speakers={report.townHall.speakers} />
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
            <DocsBody className="townhall-report-body max-w-none text-[1.0625rem] leading-8">
              <MdxContent
                components={getMDXComponents({
                  Question: (
                    props: ComponentProps<typeof TownHallQuestion>,
                  ) => (
                    <TownHallQuestion
                      {...props}
                      videoId={report.townHall.videoId}
                    />
                  ),
                })}
              />
            </DocsBody>

            <aside className="hidden lg:sticky lg:top-24 lg:block">
              {toc.length > 0 && (
                <nav aria-label="On this page">
                  <p className="text-sm font-semibold">On this page</p>
                  <ul className="border-border mt-3 space-y-2 border-l pl-4">
                    {toc.map((item) => (
                      <li
                        key={item.url}
                        style={{
                          paddingLeft: `${Math.max(0, item.depth - 2)}rem`,
                        }}
                      >
                        <a
                          href={item.url}
                          className="text-muted-foreground hover:text-foreground block text-sm leading-5 transition-colors"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="border-border mt-8 border-t pt-5">
                <p className="text-muted-foreground text-xs leading-5">
                  {report.frontmatter.editedForClarity === false
                    ? "This report follows the original recording."
                    : "Answers may be condensed or lightly edited for clarity."}
                </p>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground mt-3 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                >
                  Watch on YouTube
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ReportPageParams>;
}): Promise<Metadata> {
  const { lang, date } = await params;
  const report = await getTownHallReport(date);

  if (!report) notFound();

  const prefix = lang === "en" ? "" : `/${lang}`;
  const url = `${prefix}/townhalls/${date}`;

  return {
    title: `${report.frontmatter.title} | HytaleModding`,
    description: report.frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: report.frontmatter.title,
      description: report.frontmatter.description,
      url,
      siteName: "HytaleModding",
      publishedTime: report.townHall.date,
      images: [
        {
          url: `https://i.ytimg.com/vi/${report.townHall.videoId}/maxresdefault.jpg`,
          alt: report.frontmatter.title,
        },
      ],
    },
  };
}
