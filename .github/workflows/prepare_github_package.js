const fs = require("node:fs");

const path = "package.json";
const package = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
package.publishConfig.registry = "https://npm.pkg.github.com";
fs.writeFileSync(path, JSON.stringify(package, null, 2) + "\n", {
  encoding: "utf-8",
});
