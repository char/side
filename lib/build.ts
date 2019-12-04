import { fs, path } from "./deps.ts";

export class BuildContext {
  manifest: BuildManifest;

  readonly source: string;
  readonly target: string;

  names: string[] = [];

  global: any = {};
  local: any = {};

  constructor(manifest: BuildManifest, source: string, target: string) {
    this.source = source;
    this.target = target;
    this.manifest = manifest;
  }

  async readFileStr(name: string) {
    return await fs.readFileStr(path.resolve(this.source, name))
  }

  async readFile(name: string) {
    return await Deno.readFile(path.resolve(this.source, name))
  }

  async writeFile(name: string, data: Uint8Array) {
    const targetPath = path.resolve(this.target, name)
    await fs.ensureDir(path.dirname(targetPath))
    return await Deno.writeFile(targetPath, data)
  }
}

type MapFunction = (ctx: BuildContext, path: string, data: Uint8Array) => Promise<string>;
type TransformFunction = (ctx: BuildContext, path: string, data: Uint8Array) => Promise<Uint8Array | void>

export class BuildManifest {
  init: (ctx) => Promise<void> = async (ctx) => {};
  map: MapFunction = async (_c, path, _d) => path;
  transform: TransformFunction = async (_c, _p, data) => data;
}

const initialize = async (ctx: BuildContext) => {
  ctx.names = []

  for await (const { filename, info } of fs.walk(ctx.source)) {
    if (info.isFile())
      ctx.names.push(filename.substring(`${ctx.source}/`.length))
  }

  await ctx.manifest.init(ctx)
}

const setup = async (ctx: BuildContext, name: string) => {
  ctx.local = {}
  ctx.local.path = name
}

const transform = async (ctx: BuildContext, name: string) => {
  let data = await ctx.readFile(name)
  name = await ctx.manifest.map(ctx, name, data)
  const mutatedData = await ctx.manifest.transform(ctx, name, data)
  if (mutatedData)
    data = mutatedData

  if (name && data)
    await ctx.writeFile(name, data)
}

const runTransformations = async (ctx: BuildContext) => {
  for (const name of ctx.names) {
    await setup(ctx, name)
    await transform(ctx, name)
    console.log("CC", name)
  }
}

export const compile = async (manifest: BuildManifest, sourceDirectory: string = "src", targetDirectory: string = "build") => {
  const source = path.resolve(Deno.cwd(), sourceDirectory)
  const target = path.resolve(Deno.cwd(), targetDirectory)

  const ctx: BuildContext = new BuildContext(manifest, source, target)

  await initialize(ctx)
  await runTransformations(ctx)
}

export const chainMap: (...fns: MapFunction[]) => MapFunction =
    (...fns: MapFunction[]) => async (ctx, path, data) => {
  let workingPath = path

  for (const fn of fns) {
    const result = await fn(ctx, workingPath, data)
    if (result)
      workingPath = result
  }

  return workingPath
}

export const chainTransform: (...fns: TransformFunction[]) => TransformFunction =
    (...fns: TransformFunction[]) => async (ctx, path, data) => {
  let workingData = data

  for (const fn of fns) {
    const result = await fn(ctx, path, workingData)
    if (result)
      workingData =  result
  }

  return workingData
}
