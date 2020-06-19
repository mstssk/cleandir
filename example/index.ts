import { cleandir } from "@mstssk/cleandir";

(async function () {
  await cleandir(["dist"]);
})();
