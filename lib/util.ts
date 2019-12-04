const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

export const decodeUTF8 = (buffer: Uint8Array) => decoder.decode(buffer)
export const encodeUTF8 = (string: string) => encoder.encode(string)

export const withText: <T>(buffer: Uint8Array, callback: (s: string) => T) => T =
  (buffer, callback) => callback(decodeUTF8(buffer))

export const transformText =
  (buffer: Uint8Array, callback: (text: string) => string) => encodeUTF8(withText(buffer, callback))

export const prettyLink = (href: string) => {
  if (href.endsWith("/index.html") || href === "index.html")
    href = href.substring(0, href.length - "index.html".length)

  return href
}
