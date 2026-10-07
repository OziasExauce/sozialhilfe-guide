# Project rules

- Keep the site as plain static HTML, CSS and JavaScript at the repository root with no framework or dependencies; package.json exists only with a dependency-free copy-to-dist build script, because Lovable publishing requires an install and build step while GitHub Pages serves the root directly.
- Keep all user-facing copy in German and French on every page, because language switching is performed locally in the browser.
- Use only relative paths for pages and assets, so the site works when opening index.html locally and on any host.
- Serve the Lovable preview with a plain static file server declared in lovable.toml, because the project has no package.json or build step.
