// Copies the static GitHub Pages deliverable (project root) into public/site
// for the Lovable preview, rewriting internal links to absolute /site/ paths
// so styles, logos and navigation work whatever URL form the host uses.
// The root files remain the single source of truth and stay relative.
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "site");
const PAGES = ["index.html", "leistungen.html", "kontakt.html", "impressum.html", "datenschutz.html"];
const DIRS = ["css", "js", "images", "fonts"];

function hashOf(path) {
  return existsSync(path) ? createHash("sha1").update(readFileSync(path)).digest("hex").slice(0, 10) : "0";
}

export function syncPreview() {
  mkdirSync(OUT, { recursive: true });
  for (const dir of DIRS) {
    const src = join(ROOT, dir);
    if (!existsSync(src)) continue;
    rmSync(join(OUT, dir), { recursive: true, force: true });
    cpSync(src, join(OUT, dir), { recursive: true });
  }
  if (existsSync(join(ROOT, "favicon.svg"))) cpSync(join(ROOT, "favicon.svg"), join(OUT, "favicon.svg"));

  for (const page of PAGES) {
    const src = join(ROOT, page);
    if (!existsSync(src)) continue;
    const html = readFileSync(src, "utf8").replace(
      /(href|src)="(?!https?:|mailto:|tel:|#|\/|data:)([^"?#]+)(\?[^"#]*)?(#[^"]*)?"/g,
      (_m, attr, path, _query, hash = "") => {
        const isAsset = !path.endsWith(".html");
        const version = isAsset ? `?v=${hashOf(join(ROOT, path))}` : "";
        return `${attr}="/site/${path}${version}${hash}"`;
      },
    );
    writeFileSync(join(OUT, page), html);
  }
  // Remove stale pages that no longer exist at the root.
  for (const file of readdirSync(OUT)) {
    if (file.endsWith(".html") && !PAGES.includes(file)) rmSync(join(OUT, file));
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  syncPreview();
  console.log("public/site synced");
}
