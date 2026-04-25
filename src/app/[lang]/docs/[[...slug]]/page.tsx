import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  PageLastUpdate,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { branch } from "@/git-info.json";
import { ViewTransition } from "react";
import Link from "next/link";
import { ogLanguageBlacklist } from "@/lib/i18n";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function Page(
  props: PageProps<"/[lang]/docs/[[...slug]]">,
) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const messages = require(`@/../messages/${params.lang}.json`);

  const authors = page.data.authors;
  const loadedPageData = await page.data.load();

  const MDX = loadedPageData.body;

  return (
    <>
      <Image
        src="/assets/official-documentation/background/content-lower.webp"
        alt="Background"
        fill
        className="mask -z-10 hidden mask-b-from-50% mask-b-to-transparent mask-b-to-85% object-contain object-top opacity-50 not-md:hidden! not-dark:hidden! in-[.official]:block"
      />
      <ViewTransition share="blur-scale-transition" name="docs-page">
        {/* <div className="flex"> */}
        <DocsPage
          toc={loadedPageData.toc}
          tableOfContent={{
            style: "clerk",
          }}
          full={page.data.full}
          editOnGithub={{
            owner: "HytaleModding",
            repo: "site",
            path: `content/docs/${page.path}`,
            sha: branch,
          }}
        >
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription className="mb-0">
            {page.data.description}
          </DocsDescription>

          {/* Authors section */}
          {authors && authors.length > 0 && (
            <div className="text-muted-foreground mt-4 text-sm">
              {messages.misc.credit}{" "}
              {authors.map((author, index) => (
                <span key={index}>
                  {author.url ? (
                    <Link
                      href={author.url}
                      className="text-foreground hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {author.name}
                    </Link>
                  ) : (
                    <span className="text-foreground">{author.name}</span>
                  )}
                  {index < authors.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}

          <Separator className="mt-4 mb-6" />

          <DocsBody>
            <MDX
              components={getMDXComponents({
                // this allows you to link to other pages with relative file paths
                a: createRelativeLink(source, page),
              })}
            />
          </DocsBody>

          {/* {lastModified && <PageLastUpdate date={lastModified} />} */}
        </DocsPage>
        {/* </div> */}
      </ViewTransition>
    </>
  );
}

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    console.log("in dev, skipping static params generation");
    return [];
  }

  // we may want to filter this down to only specific languages in the future.
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/[lang]/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const slug = params.slug || [];
  const imageUrl = `/api/og/docs/${params.lang}${slug.length > 0 ? "/" + slug.join("/") : ""}`;
  const pageKeywords = (page.data as any).keywords || [];
  const globalKeywords = [
    "hytale modding",
    "hytale",
    "hytale plugins",
    "hytale mods",
    "how to mod hytale",
    "modding tutorial",
    "modding guides",
    "hytale modding guides",
    "hytale modding tutorial",
    "how to start modding Hytale",
    "how to make a mod",
  ];

  if (ogLanguageBlacklist.includes(params.lang))
    return {
      title: page.data.title,
      description: page.data.description,
      keywords: [...globalKeywords, ...pageKeywords],
    };
  else
    return {
      title: page.data.title,
      description: page.data.description,
      keywords: [...globalKeywords, ...pageKeywords],
      openGraph: {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
}
