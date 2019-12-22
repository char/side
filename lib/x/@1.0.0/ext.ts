const cache = new Map<string, any>();

export async function get(name: string): Promise<any> {
  if (cache.has(name)) {
    return cache[name];
  }

  const extension = await import(`../../ext/${name}/mod.ts`);
  cache[name] = extension;
  return extension;
}
