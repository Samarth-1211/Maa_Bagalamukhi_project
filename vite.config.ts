import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      preset: "cloudflare_module",
    },
  },
});

// For more configuration options, see https://tanstack.com/start/docs/configuration