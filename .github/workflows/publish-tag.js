const semver = require("semver");
const verStr = process.argv.slice(2)[0];
const version = semver.parse(verStr);
console.log(version.prerelease[0] || "latest");
