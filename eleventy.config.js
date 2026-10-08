import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import metadata from "./content/_data/metadata.js";

export default function(eleventyConfig) {

  // Drafts preprocessor
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft) {
      data.title = `${data.title} (draft)`
    }

    if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false
    }
  })

  // Descriptions arrive with decorative star marks; drop them for display
  eleventyConfig.addPreprocessor("description-marks", "*", (data, content) => {
    if (typeof data.description === "string") {
      data.description = data.description.replace(/\s*[\u2737\u274B]+/g, "").trim()
    }
  })

  eleventyConfig.addPassthroughCopy("content/img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).disable("code");

  // Give headings GitHub-style ids so in-page links (e.g. a TOC) resolve
  md.core.ruler.push("heading_ids", (state) => {
    const seen = new Map();
    state.tokens.forEach((token, i) => {
      if (token.type !== "heading_open") return;
      const text = state.tokens[i + 1].children
        .filter((t) => t.type === "text" || t.type === "code_inline")
        .map((t) => t.content)
        .join("");
      const slug = text.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, "").replace(/\s+/g, "-");
      const n = seen.get(slug) ?? 0;
      seen.set(slug, n + 1);
      token.attrSet("id", n ? `${slug}-${n}` : slug);
    });
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("chapters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/chapters/*.md").sort((a, b) => {
      // Opt-in newest-first feed: metadata.sortBy = "date" (see chapters.11tydata.js)
      if (metadata.sortBy === "date") {
        return b.date - a.date || a.inputPath.localeCompare(b.inputPath);
      }
      const aOrder = a.data.order ?? 999;
      const bOrder = b.data.order ?? 999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.inputPath.localeCompare(b.inputPath);
    });
  });

  eleventyConfig.setServerOptions({
    showAllHosts: true
  });

  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed/feed.xml",
    collection: {
      name: "chapters",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "My Literary Work",
      subtitle: "A description of this work",
      base: metadata.url,
      author: {
        name: "Your Name"
      }
    }
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}
