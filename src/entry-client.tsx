import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/_routes'

const rootElement = document.getElementById('app')

if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement!)
  root.render(<RouterProvider router={router} />)
} else {
  ReactDOM.hydrateRoot(rootElement, <RouterProvider router={router} />)
}
