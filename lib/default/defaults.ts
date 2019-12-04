import { chainMap, chainTransform } from "../build.ts";
import { mapMarkdown, transformMarkdown } from "./default-markdown.tsx";
import { transformTSX, mapTSX } from "./default-tsx.ts";

export const map = chainMap(
  mapMarkdown,
  mapTSX
)

export const transform = chainTransform(
  transformMarkdown,
  transformTSX
)
