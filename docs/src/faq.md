---
title: FAQ
nav_order: 1
---

## Does this mean `deno` is ready for production?

In short: No. This was a *pain* to write. I can't even create a `side dev` command,
since there is currently no working way to get cross-platform file watching under deno.
For now, I just use a makefile for my development environment.

## Can I see the source for this site?

Yes! It's in the docs folder [on GitHub](https://github.com/half-cambodian-hacker-man/side).

## Why `side` over other static site generators?

No reason, really. There are two selling points for `side`:

- It uses `deno`,
- It works.
