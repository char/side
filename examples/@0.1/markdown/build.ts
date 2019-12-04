import {
  transformText, renderMarkdown
} from "https://side.alloc.tech/@0.1/mod.ts"

export const map = async (_c, path, _d) =>
  path.replace(/\.md$/, ".html")

export const transform = async (_c, _p, data) =>
  transformText(data, text => renderMarkdown(text).content)
