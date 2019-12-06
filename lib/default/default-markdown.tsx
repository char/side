import { Templating as React, renderTemplate, Template } from "../templating.ts"
import { transformText } from "../util.ts"
import { renderMarkdown } from "../markdown.ts"
import { minifyCSS } from "../minification.ts"

export const template: Template = ({ content }) => <html>
  <head>
    <meta charset="utf-8" />

    <style __innerHTML={minifyCSS(`
      body {
        font-family: sans-serif;
      }
    `)}/>
  </head>

  <body>
    <main __innerHTML={content} />
  </body>
</html>

export const mapMarkdown = (_c, path, _d) =>
  path.replace(/\.md$/, ".html")

export const transformMarkdown = async (ctx, path, data) => {
  if (path.endsWith(".md"))
    return transformText(data, markdown =>
      renderTemplate(ctx, template, renderMarkdown(markdown)))
}
