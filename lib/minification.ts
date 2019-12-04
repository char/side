import { transformText } from "./util.ts";

export const minifyCSS = (css: string) => css
  .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')
  .replace(/ {2,}/g, ' ')
  .replace(/ ([{:}]) /g, '$1')
  .replace(/([;,]) /g, '$1')
  .replace(/ !/g, '!');

export const minifyHTML = (html: string) => {
  // html.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, "$1$3");

  let minifiedHTML = ""
  let preformattedBlock = 0
  for (const line of html.split("\n")) {
    if (line.includes("<pre"))
      preformattedBlock++

    if (!preformattedBlock) {
      minifiedHTML += line.replace(/^[\n\t ]*/g, "")
    } else {
      minifiedHTML += line + "\n"
    }

    if (line.includes("</pre"))
      preformattedBlock--
  }

  return minifiedHTML
}

export const minify = async (ctx, path, data) => {
  if (path.endsWith(".html"))
    return transformText(data, minifyHTML)

  if (path.endsWith(".css"))
    return transformText(data, minifyCSS)

  return data
}
