export default async ({ content, metadata }, React) =>

<html>
  <head>
    <meta charset="utf-8" />

    {metadata.title && <title>{metadata.title}</title>}
    {metadata.description && <meta property="og:description" content={metadata.description} />}
    {metadata.description && <meta property="description" content={metadata.description} />}
    {/* Any other meta tags you want */}
  </head>

  <body>
    <main __content={content} />
  </body>
</html>
