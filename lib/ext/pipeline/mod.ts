type PipelineElement = [ (string) => string | Promise<string | undefined>, (Uint8Array) => Promise<Uint8Array> ]

export function ext(match, replacement) {
  return async (name) => {
    if (name.endsWith(match)) {
      return name.substring(0, name.length - match.length) + replacement
    } else {
      return undefined;
    }
  }
}

export function text(callback: (string) => Promise<string>): (Uint8Array) => Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");

  return async (buffer) => {
    let text = decoder.decode(buffer);
    text = await callback(text)
    buffer = encoder.encode(text)

    return buffer
  }
}

export async function htmlDirectories(name: string): Promise<string | undefined> {
  if (name.endsWith(".html") && !(name === "index.html" || name.endsWith("/index.html"))) {
    return name.substring(0, name.length - ".html".length) + "/index.html"
  }

  return undefined;
}

export async function nopTransform(buffer: Uint8Array): Promise<Uint8Array> {
  return buffer
}

export async function pipeline(side, ctx, elements: PipelineElement[]) {
  for (const name of ctx.names) {
    let mappedName = name;
    let buffer = await ctx.read(name);

    for (const element of elements) {
      const elementMappedName = await element[0](mappedName);
      if (elementMappedName === undefined)
        continue;

      mappedName = elementMappedName;
      buffer = await element[1](buffer);
    }

    await ctx.write(mappedName, buffer);
  }
}
