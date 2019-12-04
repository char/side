import { BuildManifest, compile } from "./mod.ts"
import { flags } from "./deps.ts"

const args = flags.parse(Deno.args.slice(1));

const sourceDirectory = args._[0] || "src";
const targetDirectory = args._[1] || "build";

const manifest = new BuildManifest();
const userManifest = await import(`file://${Deno.cwd()}/build.ts`)

for (const [key, value] of Object.entries(userManifest)) {
  manifest[key] = value
}

compile(manifest, sourceDirectory, targetDirectory)
