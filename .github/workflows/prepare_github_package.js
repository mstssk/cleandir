import * as fs from "node:fs";

const path = "package.json";
const pkg = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
pkg.publishConfig.registry = "https://npm.pkg.github.com";
fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n", {
  encoding: "utf-8",
});
