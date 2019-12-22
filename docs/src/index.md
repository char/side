---
title: Home
nav_order: 0
---

# `side`: sites with deno

This is a static site generator made with `deno`.

## Install

```bash
$ deno install side "https://side.alloc.tech/x/main.ts" --allow-read --allow-write --allow-net
```

## Getting Started

All configuration is done through TypeScript. Here, we use a TypeScript *build manifest* to render out some Markdown:

```typescript
export const build = async (side, ctx) => {
  const { pipeline, ext, text } = await side.ext.get("pipeline");
  const { renderMarkdown } = await side.ext.get("markdown");

  return await pipeline(side, ctx, [
    [ ext(".md", ".html"), text(async md => renderMarkdown(md).content) ]
  ])
}
```

And we can compile the site in one command:

```sh
$ side
```
