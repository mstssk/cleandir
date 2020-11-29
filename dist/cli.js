const { cleandir } = require("./index");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Any directories are not specified.");
  process.exit(1);
}

cleandir(args).then(
  () => {
    console.log("done.");
  },
  (reason) => {
    console.error(reason);
    process.exit(1);
  }
);
