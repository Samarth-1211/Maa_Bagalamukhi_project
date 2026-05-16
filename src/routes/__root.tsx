import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/temple/Navbar";
import { Footer } from "@/components/temple/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;600&family=Inter:wght@300;400;500;600&family=Tiro+Devanagari+Hindi:ital@0;1&family=Noto+Serif+Devanagari:wght@400;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const whatsappNumberE164 = "+919669401930";
  const whatsappChatUrl = `https://wa.me/${whatsappNumberE164.replace("+", "")}`;

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <a href={`tel:${whatsappNumberE164}`} aria-label="Call us" className="call-float">
          <span className="call-float__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.8 20.5c-.3.3-1 .7-1.7.7-1.2 0-3.1-1.2-5-3-1.8-1.8-3-3.8-3-5 0-.7.4-1.4.7-1.7.3-.3.4-.8.1-1.2l-1.5-2.5c-.2-.4-.7-.6-1.2-.5-1 .3-2 .9-2.7 1.8-.8 1.1-.8 2.8-.4 4.6.7 2.7 2.7 5.9 5.3 8.4s5.7 4.6 8.4 5.3c1.8.5 3.5.4 4.6-.4.9-.7 1.5-1.7 1.8-2.7.1-.4-.1-.9-.5-1.2l-2.5-1.5c-.4-.3-.9-.2-1.2.1Z"
                fill="white"
              />
            </svg>
          </span>
        </a>

        <a
          href={whatsappChatUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="whatsapp-float"
        >
          <span className="whatsapp-float__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.03 6.06c-5.47 0-9.92 4.36-9.92 9.73 0 1.72.46 3.39 1.35 4.85L5.06 26l5.37-1.43c1.42.76 3.04 1.16 4.7 1.16 5.47 0 9.92-4.36 9.92-9.73 0-5.37-4.45-9.74-9.99-9.94Z"
                fill="currentColor"
              />
              <path
                d="M20.98 18.08c-.27-.13-1.57-.77-1.82-.86-.25-.1-.44-.13-.62.13-.18.27-.71.86-.87 1.03-.16.18-.32.2-.59.07-.27-.13-1.12-.41-2.14-1.3-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.42.11-.55.11-.11.25-.32.37-.48.12-.16.16-.27.25-.45.09-.18.04-.35-.02-.48-.06-.13-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.45.07-.69.33-.24.26-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.18 1.82 2.86 4.4 3.9.62.25 1.1.4 1.48.51.62.2 1.18.18 1.62.11.49-.07 1.57-.64 1.79-1.26.22-.62.22-1.16.15-1.26-.06-.1-.22-.16-.49-.29Z"
                fill="white"
                opacity="0.95"
              />
            </svg>
          </span>
        </a>

        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
    <Navbar />

    <main className="relative min-h-screen overflow-x-hidden">
      <Outlet />
    </main>
  
    <Footer />
    </QueryClientProvider>
  );
}
