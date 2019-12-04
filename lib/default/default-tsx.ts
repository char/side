import { renderTemplate } from "../templating.ts"
import { encodeUTF8 } from "../util.ts"

export const mapTSX = (_c, path, _d) =>
  path.replace(/\.tsx$/, ".html")

export const transformTSX = async (ctx, path, data) => {
  if (path.endsWith(".tsx")) {
    const template = (await import(`file://${ctx.locateFile(path)}`)).default
    const html = renderTemplate(ctx, template, {})
    return encodeUTF8(html)
  }
}
