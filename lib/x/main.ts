// Dynamically import the latest version of side
import * as path from "https://deno.land/std@v0.28.1/path/mod.ts"
import * as fs from "https://deno.land/std@v0.28.1/fs/mod.ts";

type Side = any;

async function getVersion() {
  let versionJSON = null;

  try {
    const versionJSONLocation = path.dirname(new URL(import.meta.url).pathname) + "/version.json";
    versionJSON = await fs.readJson(versionJSONLocation);
  } catch (e) {
    versionJSON = await fetch("https://side.alloc.tech/x/version.json").then(r => r.json());
  }

  return versionJSON.versions[0]
}

const side: Side = await import(`./@${await getVersion()}/mod.ts`) as any
const { BuildContext } = side

try {
  const buildScript = await import(new URL(`file://${Deno.cwd()}/build.ts`).href);
  try {
    const manifest = buildScript.manifest || {};

    const ctx = new BuildContext(side, Deno.cwd(), manifest);
    await ctx.init();

    await buildScript.build(side, ctx)
  } catch (e) {
    console.error("Error executing build script.")
    console.error(e)
  }
} catch (e) {
  console.error("Error loading build script.")
  console.error(e)
}
