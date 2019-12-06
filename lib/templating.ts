import { BuildContext } from "./build.ts"
import { createElement, renderToString } from "./vendor/hyperons.js"

export const Templating = {
  createElement
}

export type Template = (props: { [x: string]: any, ctx: BuildContext }) => (string | Promise<string>)

export const renderTemplate = async (ctx: BuildContext, template: Template, scope: any) => {
  const renderScope = { ...scope, ctx }
  return renderToString(await template(renderScope))
}
