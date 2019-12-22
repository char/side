export default ({ metadata, content, ctx, React }) => {
  const { global } = ctx

  return (
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link href="data:," rel="icon" />

      <title>{ metadata.title } - side</title>
      <meta name="generation-date" content={ global.date } />
      <style __content={global.styles} />
    </head>
    <body>
      <nav>
        <ul>
          {global.nav.map(({title, href}) =>
            <li><a href={"/" + href}>{title}</a></li>
          )}
        </ul>
      </nav>

      <main __content={content} />

      <footer>
        <p>A project by <a href="https://anthony.som.codes/">Anthony Som</a>.</p>
      </footer>
    </body>
    </html>
  )
}
