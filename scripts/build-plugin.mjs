// Generates the plugin manifests from package.json and the folders in skills/.
// Run after adding, renaming, or removing a skill, or after changing package.json:
//   pnpm build:plugin  write the manifests
//   pnpm check:plugin  exit 1 if they're out of date

import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
// The plugin takes the package name (it prefixes every command); the marketplace takes the repo name.
const repository = pkg.repository?.url ?? pkg.repository;
const meta = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  repository,
  license: pkg.license,
};

const skills = readdirSync(join(root, "skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(root, "skills", entry.name, "SKILL.md")))
  .map((entry) => entry.name)
  .sort();

const outputs = {
  // Claude Code reads it; npx skills groups only the skills listed here.
  ".claude-plugin/plugin.json": {
    ...meta,
    skills: skills.map((name) => `./skills/${name}`),
  },
  // Lets Claude Code install the repo with /plugin marketplace add.
  ".claude-plugin/marketplace.json": {
    name: repository.split("/").pop().replace(/\.git$/, ""),
    owner: meta.author,
    description: meta.description,
    plugins: [{ name: meta.name, source: "./", description: meta.description }],
  },
};

const check = process.argv.includes("--check");
let stale = [];

for (const [path, data] of Object.entries(outputs)) {
  const file = join(root, path);
  const text = JSON.stringify(data, null, 2) + "\n";
  const current = existsSync(file) ? readFileSync(file, "utf8").replace(/\r\n/g, "\n") : null;
  if (current === text) continue;
  if (check) {
    stale.push(path);
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, text);
    console.log(`wrote ${path}`);
  }
}

if (check && stale.length > 0) {
  console.error(`out of date: ${stale.join(", ")}. Run: node scripts/build-plugin.mjs`);
  process.exit(1);
}
console.log(`${skills.length} skills`);
