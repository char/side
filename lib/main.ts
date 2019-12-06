import { BuildManifest, compile } from "./mod.ts"
import * as defaultManifest from "./default/defaults.ts"
import { flags, fs } from "./deps.ts"

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
  if (await fs.exists(`${Deno.cwd()}/build.ts`)) {
    const userManifest = await import(`file://${Deno.cwd()}/build.ts`)
    cloneManifest(userManifest)
  } else {
    console.warn("No build.ts found! Using the default configuration file.")
  }
} catch (e) {
  console.error("An error occurred while importing the build.ts file:")
  console.error(e)
}

compile(manifest, sourceDirectory, targetDirectory)
