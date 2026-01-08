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

export default async function Page(
  props: PageProps<"/[lang]/docs/[[...slug]]">,
) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const messages = require(`@/../messages/${params.lang}.json`);

  const MDX = page.data.body;
  // const lastModified = await getGithubLastEdit({
  //   owner: "HytaleModding",
  //   repo: "site",
  //   path: `content/docs/${page.path}`
  // })
  const authors = page.data.authors;

  return (
    <ViewTransition enter="blur-scale-transition" exit="blur-scale-transition">
      <DocsPage
        toc={page.data.toc}
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
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>

        {/* Authors section */}
        {authors && authors.length > 0 && (
          <div className="text-muted-foreground mt-8 text-sm">
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

        {/* {lastModified && <PageLastUpdate date={lastModified} />} */}
      </DocsPage>
    </ViewTransition>
  );
}

export async function generateStaticParams() {
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
