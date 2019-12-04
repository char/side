# side

A static site generator written using [deno](https://deno.land/).

## Build Manifest

The *build manifest* resides in `build.ts` and is comprised of three functions:

```typescript
export async function init(ctx) => void;
export async function map(ctx, name, data) => name;
export async function transform(ctx, name, data) => data;
```
