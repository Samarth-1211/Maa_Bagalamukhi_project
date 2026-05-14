import fs from "node:fs";
import path from "node:path";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFileSync(from, to) {
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
}

function listFilesRecursive(dirPath) {
  const out = [];
  const stack = [dirPath];

  while (stack.length) {
    const cur = stack.pop();
    if (!cur) continue;

    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else out.push(full);
    }
  }

  return out;
}

const projectRoot = path.resolve(process.argv[2] ?? ".");
const distDir = process.argv[3] ? path.resolve(projectRoot, process.argv[3]) : path.join(projectRoot, "dist");

const srcAssetsDir = path.join(distDir, "client", "assets");
const dstAssetsDir = path.join(distDir, "assets");

if (!fs.existsSync(srcAssetsDir)) {
  throw new Error(`Source assets dir not found: ${srcAssetsDir}`);
}

ensureDir(dstAssetsDir);

const files = listFilesRecursive(srcAssetsDir);

// copy everything under dist/client/assets -> dist/assets
let copied = 0;
for (const file of files) {
  const rel = path.relative(srcAssetsDir, file);
  const target = path.join(dstAssetsDir, rel);
  copyFileSync(file, target);
  copied++;
}

console.log(`[copy-assets-to-dist-assets] copied ${copied} files to ${dstAssetsDir}`);
