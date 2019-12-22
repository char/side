import template from "./template.tsx";
import hljs from "./vendor/hljs/index.js";

export async function build(side, ctx) {
  const { pipeline, ext, text, htmlDirectories, nopTransform } = await side.ext.get("pipeline");
  const { renderTemplate } = await side.ext.get("templating");
  const { marked, renderMarkdown } = await side.ext.get("markdown");
  const { minifyCSS, minifyHTML } = await side.ext.get("minification");

  marked.setOptions({
    highlight: (code, lang) => {
      if (lang) return hljs.highlight(lang, code).value;
      else return code;
    }
  });

  ctx.global.styles = minifyCSS(await ctx.readText("../global.css"));
  ctx.global.nav = await generateNav(side, ctx);
  ctx.global.date = new Date();

  return await pipeline(side, ctx, [
    [ ext(".md", ".html"), text(async md => renderTemplate(ctx, template, renderMarkdown(md))) ],
    [ htmlDirectories, nopTransform ],
    [ n => n.endsWith(".html") ? n : undefined, text(async html => minifyHTML(html)) ]
  ]);
}

async function generateNav(side, ctx) {
  const { withText, prettyLink } = side;
  const { parseFrontMatter } = await side.ext.get("markdown");

  let nav = [];

  for (const name of ctx.names.filter(n => n.endsWith(".md"))) {
    const { metadata } = withText(await ctx.read(name), parseFrontMatter);
    if (metadata.nav_order != null) nav.push({ name, metadata });
  }

  function mapName(name) {
    name = name.replace(/.md$/, ".html");
    if (name.endsWith(".html") && !(name === "index.html" || name.endsWith("/index.html"))) {
      return name.substring(0, name.length - ".html".length) + "/index.html";
    }

    return name;
  }

  return nav
    .sort((a, b) => a.metadata.nav_order - b.metadata.nav_order)
    .map(({ name, metadata }) => ({
      title: metadata.title,
      href: prettyLink(mapName(name))
    }));
}
