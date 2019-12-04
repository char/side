import { marked, yaml } from "./deps.ts"
export { marked }

export const parseFrontMatter: (markdown: string) => { content: string, metadata: any } =
   (markdown) => {
  const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown);
  if (!match)
    return { metadata: {}, content: markdown }

  const frontMatter = match[1];
  const content = markdown.slice(match[0].length);


  const metadata = yaml.parse(frontMatter);
  return { metadata, content }
}

export const renderMarkdown = (markdown: string) => {
  const { content, metadata } = parseFrontMatter(markdown)

  return { content: marked.parse(content), metadata }
}
