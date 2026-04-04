import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";
// import { enableImageFetchCache } from "./src/lib/image-cache";

// Enable fetch caching for image processing during build
// This prevents hitting the same image URL multiple times across translations
// await enableImageFetchCache();

const extendedSchema = frontmatterSchema.extend({
  authors: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url().optional(),
      }),
    )
    .optional(),
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: extendedSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
    async: true,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      langs: ["java"],
      themes: {
        light: "light-plus",
        dark: "github-dark",
      },
    },
  },
});
