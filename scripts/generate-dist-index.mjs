import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(process.argv[2] ?? ".");
const distDir = process.argv[3]
  ? path.resolve(projectRoot, process.argv[3])
  : path.join(projectRoot, "dist");
const assetsDir = path.join(distDir, "client", "assets");

function listDirSafe(dirPath) {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

function findFirstIndexAsset(files, ext) {
  const candidates = files
    .filter((f) => f.isFile())
    .map((f) => f.name)
    .filter((n) => n.startsWith("index-") && n.endsWith(ext))
    .sort();

  if (candidates.length < 1) {
    throw new Error(`Expected at least 1 file matching index-*${ext} in ${assetsDir}, found none.`);
  }
  return candidates[0];
}

// Best-effort: TanStack Start manifest embeds the correct client entry (clientEntry: "/assets/index-....js")
function resolveClientEntryFromManifest(distDir) {
  const serverAssetsDir = path.join(distDir, "server", "assets");
  const entries = listDirSafe(serverAssetsDir)
    .filter((f) => f.isFile())
    .map((f) => f.name);

  const manifest = entries.find(
    (n) => n.startsWith("_tanstack-start-manifest_") && n.endsWith(".js"),
  );
  if (!manifest) return null;

  const manifestPath = path.join(serverAssetsDir, manifest);
  const content = fs.readFileSync(manifestPath, "utf8");

  // Match e.g. clientEntry: "/assets/index-XXXX.js"
  const m = content.match(/clientEntry:\s*"([^"]+)"/);
  if (!m) return null;

  const href = m[1]; // "/assets/index-....js"
  const assetFile = href.replace(/^\/assets\//, "");
  return assetFile || null;
}

function findFirstStylesheet(files) {
  const cssCandidates = files
    .filter((f) => f.isFile())
    .map((f) => f.name)
    .filter((n) => n.startsWith("index-") && n.endsWith(".css"));

  if (cssCandidates.length < 1) {
    throw new Error(`Expected at least 1 CSS like index-*.css in ${assetsDir}, found none.`);
  }

  return cssCandidates.sort()[0];
}

const files = listDirSafe(assetsDir);

const resolvedClientEntry = resolveClientEntryFromManifest(distDir);
const indexJs = resolvedClientEntry ?? findFirstIndexAsset(files, ".js");
const indexCss = findFirstStylesheet(files);

// Vite/TanStack assets in dist/client/assets are served from /assets/...
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/assets/${indexCss}" />
    <title>Maa Baglamukhi Temple</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${indexJs}"></script>
  </body>
</html>
`;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, "index.html"), indexHtml, "utf8");

console.log(`[generate-dist-index] wrote ${path.join(distDir, "index.html")}`);
console.log(`[generate-dist-index] using assets: css=${indexCss} js=${indexJs}`);
