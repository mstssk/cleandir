import { cleandir } from "./cleandir";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.warn("usage: cleandir [...dirs]");
  process.exit(1);
}

cleandir(args).catch((reason) => {
  console.error(reason);
  process.exit(1);
});
