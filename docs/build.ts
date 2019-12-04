import {
  BuildContext,
  renderTemplate, renderMarkdown, parseFrontMatter,
  withText, transformText,

  prettyLink,
  minifyCSS, minify,

  chainTransform
} from "../lib/mod.ts";

import template from "./template.tsx";

import { marked } from "../lib/mod.ts";
import hljs from "./vendor/hljs/index.js"

marked.setOptions({
  highlight: (code, lang) => {
    if (lang) return hljs.highlight(lang, code).value
    else return code
  }
})

export const init = async (ctx: BuildContext) => {
  ctx.global.siteTitle = "My Site";
  ctx.global.date = new Date();

  ctx.global.styles = minifyCSS(await ctx.readFileStr("../global.css"));

  await generateNav(ctx)
};

const generateNav = async (ctx: BuildContext) => {
  ctx.global.nav = [];

  for (const name of ctx.names.filter(n => n.endsWith(".md"))) {
    const { metadata } = withText(await ctx.readFile(name), parseFrontMatter);
    if (metadata.nav_order != null) ctx.global.nav.push({ name, metadata });
  }

  ctx.global.nav = ctx.global.nav
    .sort((a, b) => a.metadata.nav_order - b.metadata.nav_order)
    .map(({ name, metadata }) => ({
      title: metadata.title,
      href: prettyLink(map(null, name, null))
    }));
}

export const map = (_c, path, _d) => {
  if (path.endsWith("index.md")) {
    return path.substring(0, path.lastIndexOf(".")) + ".html";
  } else {
    return path.replace(/\.md$/, "/index.html")
  }
};

export const transform = chainTransform(
  async (ctx, path, data) =>
    transformText(data, markdown =>
      renderTemplate(ctx, template, renderMarkdown(markdown))
    ),
  minify
)
