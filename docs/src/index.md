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

### build.ts

```typescript
import {
  transformText, renderMarkdown
} from "https://side.alloc.tech/x/mod.ts"

export const map = (_c, path, _d) =>
  path.replace(/\.md$/, ".html")

export const transform = async (_c, _p, data) =>
  transformText(data, text => renderMarkdown(text).content)
```
