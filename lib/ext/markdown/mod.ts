import marked from "https://denolib.com/denolib/marked/main.ts";
import * as yaml from "https://deno.land/std@v0.28.1@v0.28.1/encoding/yaml.ts";

export function parseFrontMatter(markdown: string): { content: string, metadata: any } {
  const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown);
  if (!match)
    return { metadata: {}, content: markdown }

  const frontMatter = match[1];
  const content = markdown.slice(match[0].length);

  const metadata = yaml.parse(frontMatter);
  return { metadata, content }
}

export function renderMarkdown(markdown: string): { content: string, metadata: any } {
  const { content, metadata } = parseFrontMatter(markdown)
  return { content: marked.parse(content), metadata }
}

export { marked }
