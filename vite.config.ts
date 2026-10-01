// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
// @ts-expect-error plain ESM helper without type declarations
import { syncPreview } from "./scripts/sync-preview.mjs";

// Regenerates public/site from the static deliverable at the project root on every
// dev start, build, and edit of a deliverable file, so the preview never drifts.
const staticSitePreview = {
  name: "static-site-preview-sync",
  buildStart() {
    syncPreview();
  },
  configureServer(server: { watcher: { on: (e: string, cb: (file: string) => void) => void } }) {
    syncPreview();
    const watched = /[\\/](index|leistungen|kontakt|impressum|datenschutz)\.html$|[\\/](css|js|images|fonts)[\\/]|favicon\.svg$/;
    server.watcher.on("change", (file) => {
      if (!file.includes(`${"public"}`) && watched.test(file)) syncPreview();
    });
  },
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [staticSitePreview],
  },
});
