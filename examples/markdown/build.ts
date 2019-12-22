import template from "./template.tsx";

export const build = async (side, ctx) => {
  const { pipeline, ext, text } = await side.ext.get("pipeline")
  const { renderMarkdown } = await side.ext.get("markdown")
  const { renderTemplate } = await side.ext.get("templating")

  return await pipeline(side, ctx, [
    [ ext(".md", ".html"), text(async md => renderTemplate(ctx, template, renderMarkdown(md))) ]
  ])
}
