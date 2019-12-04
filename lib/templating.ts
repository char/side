import { BuildContext } from "./build.ts"
import { createElement, renderToString } from "./vendor/hyperons.js"

export const Templating = {
  createElement
}

export const renderTemplate = (ctx: BuildContext, template: (any) => string, scope: any) => {
  const renderScope = { ...scope, ...ctx }
  return renderToString(template(renderScope))
}
