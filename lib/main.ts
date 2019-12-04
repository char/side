import { BuildManifest, compile } from "./mod.ts"
import * as defaultManifest from "./default/defaults.ts"
import { flags } from "./deps.ts"

const args = flags.parse(Deno.args.slice(1));

const sourceDirectory = args._[0] || "src";
const targetDirectory = args._[1] || "build";

const manifest = new BuildManifest();

function cloneManifest(source) {
  for (const [key, value] of Object.entries(source)) {
    manifest[key] = value
  }
}

cloneManifest(defaultManifest)
try {
  const userManifest = await import(`file://${Deno.cwd()}/build.ts`)
  cloneManifest(userManifest)
} catch (e) {
  console.error("An error occurred while importing the build.ts - Using the default.")
}

compile(manifest, sourceDirectory, targetDirectory)
