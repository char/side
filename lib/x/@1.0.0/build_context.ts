import { fs, path } from "./deps.ts";

export interface BuildManifest {
  source: string;
  target: string;
}

export class BuildContext {
  readonly side: any;

  readonly sourceDir: string;
  readonly targetDir: string;

  names: string[] = [];
  global: any = {};

  constructor(side: any, cwd: string, manifest: BuildManifest) {
    this.side = side;

    this.sourceDir = cwd + "/" + (manifest.source || "src")
    this.targetDir = cwd + "/" + (manifest.target || "build")
  }

  async init() {
    for await (const { filename, info } of fs.walk(this.sourceDir)) {
      if (info.isFile())
        this.names.push(filename.substring(`${this.sourceDir}/`.length))
    }
  }

  locateSourceFile(name: string): string {
    return path.resolve(Deno.cwd(), this.sourceDir, name)
  }

  async read(name: string): Promise<Uint8Array> {
    return await Deno.readFile(this.locateSourceFile(name))
  }

  async write(name: string, data: Uint8Array) {
    const targetPath = path.resolve(Deno.cwd(), this.targetDir, name)
    try { await fs.ensureDir(path.dirname(targetPath)) } catch (e) {}
    return await Deno.writeFile(targetPath, data)
  }

  async copy(name: string) {
    await this.write(name, await this.read(name))
  }
}
