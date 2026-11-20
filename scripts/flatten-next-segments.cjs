const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");

function collectFiles(directory, relative, files) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const nextRelative = [...relative, entry.name];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, nextRelative, files);
    } else if (entry.isFile()) {
      files.push({ relative: nextRelative, fullPath });
    }
  }
}

function flatten(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.name.startsWith("__next")) {
      const files = [];
      collectFiles(fullPath, [], files);
      for (const file of files) {
        const target = path.join(directory, [entry.name, ...file.relative].join("."));
        if (!fs.existsSync(target)) {
          fs.copyFileSync(file.fullPath, target);
          flattened += 1;
        }
      }
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else if (entry.name !== "_next" && entry.name !== "assets") {
      flatten(fullPath);
    }
  }
}

let flattened = 0;
if (fs.existsSync(outDir)) {
  flatten(outDir);
}
console.log(`Flattened ${flattened} Next.js segment payloads for static export.`);
