import { createCompiler } from "@fumadocs/mdx-remote";

export const blogCompiler = createCompiler({
  // GFM (tables, strikethrough, task lists, bold/italic edge cases) is included by default
  rehypeCodeOptions: {
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    // lazy: true // enable if you have a huge/unbounded set of languages and want on-demand loading
  },
});