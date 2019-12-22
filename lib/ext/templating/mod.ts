import { createElement, renderToString } from "./hyperons.js"

export const Templating = {
  createElement
}

export const renderTemplate = async (ctx, template, scope) => {
  const renderScope = { ...scope, ctx, React: Templating }
  return renderToString(await template(renderScope))
}
