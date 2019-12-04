import { BuildContext } from "./build.ts"
import { createElement, renderToString } from "./vendor/hyperons.js"

export const Templating = {
  createElement
}

export const renderTemplate = (ctx: BuildContext, template: (any) => string, scope: any) => {
  const renderScope = { ...scope, ...ctx }
  return renderToString(template(renderScope))
}

/*


const renderAttributes = (attr: any): string => (
  Object
    .entries(attr)
    .map(([key, value]) => typeof value === 'boolean' ? key : `${key}="${value.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`)
    .join(' ')
)

const renderInnerHTMLs = (innerHTMLs: (number | string | boolean)[]): string => (
  innerHTMLs.map(
    (innerHTML = '') => (
      Array.isArray(innerHTML)
        ? innerHTML.map(html => html.toString()).join('')
        : innerHTML.toString()
    )
  ).join('')
)

export const h = (tagName: string, attributes: any, ...innerHTMLs: (number | string | boolean)[]): string =>
  `<${tagName}${attributes ? ` ${renderAttributes(attributes)}` : ''}>${renderInnerHTMLs(innerHTMLs)}</${tagName}>`;

export const Templating = {
  createElement: h
}
*/
