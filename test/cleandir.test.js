const fs = require("fs").promises;
const { copyfiles, glob } = require("./utils");
const { cleandir } = require("../");

const TARGET_DIR1 = "./test/target1";
const TARGET_DIR2 = "./test/target2";

beforeEach(async () => {
  const opt = { up: 2, all: true, error: true };
  await copyfiles(["./test/fixture1/**/*", TARGET_DIR1], opt);
  await copyfiles(["./test/fixture2/**/*", TARGET_DIR2], opt);
});

afterEach(async () => {
  await fs.rmdir(TARGET_DIR1, { recursive: true });
  await fs.rmdir(TARGET_DIR2, { recursive: true });
});

expect.extend({
  /**
   * Expect target dir only contains specified files.
   *
   * @param {string} dir A dir path.
   * @param {string[]} expected Contained file paths.
   */
  async onlyContains(dir, expected) {
    let files = await glob(`${dir}/**/*`, { dot: true });
    files = files.map((f) => f.replace(new RegExp(`^${dir}/`), ""));
    const pass = this.equals(files, expected);
    return {
      pass,
      message: () =>
        `expected files [${expected}] to${pass ? "" : " NOT"} match [${files}]`,
    };
  },
});

test("Cleanup target dirs.", async () => {
  // BEFORE
  await expect(TARGET_DIR1).onlyContains([
    ".dummy",
    ".gitkeep",
    ".keep",
    "abc.txt",
    "efg.txt",
    "hij",
    "hij/klm.txt",
    "hij/nop.txt",
    "hij/qrs.jpg",
  ]);
  await expect(TARGET_DIR2).onlyContains(["foobar.txt"]);

  await cleandir([TARGET_DIR1, TARGET_DIR2]);

  // AFTER
  await expect(TARGET_DIR1).onlyContains([".gitkeep", ".keep"]);
  await expect(TARGET_DIR2).onlyContains([]);
});
