import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/_routes'

export async function render() {
  const html = renderToString(
    <RouterProvider router={router} />
  )

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Maa Bagalamukhi Temple</title>
  </head>
  <body>
    <div id="app">${html}</div>
    <script type="module" src="/src/entry-client.tsx"></script>
  </body>
</html>`
}
