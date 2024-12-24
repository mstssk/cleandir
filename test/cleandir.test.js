import { test, expect, beforeEach, afterEach } from "vitest";

const fs = require("node:fs").promises;
const path = require("node:path");
const { globSync } = require("glob");
const { copyfiles } = require("./utils");
const { cleandir } = require("../");

const TARGET_DIR1 = "./test/target1";
const TARGET_DIR2 = "./test/target2";

beforeEach(async () => {
  const opt = { up: 2, all: true, error: true };
  await copyfiles(["./test/fixture1/**/*", TARGET_DIR1], opt);
  await copyfiles(["./test/fixture2/**/*", TARGET_DIR2], opt);
});

afterEach(async () => {
  await (fs.rm || fs.rmdir)(TARGET_DIR1, { recursive: true });
  await (fs.rm || fs.rmdir)(TARGET_DIR2, { recursive: true });
});

expect.extend({
  /**
   * Expect target dir only contains specified files.
   *
   * @param {string} dir A dir path.
   * @param {string[]} expected Contained file paths.
   */
  onlyContains(dir, expected) {
    const files = globSync(`${dir}/**/*`, { dot: true })
      .map((f) => path.relative(dir, f))
      .sort();
    expected = expected.map((f) => path.normalize(f)).sort(); // for Windows path segment separator.
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
  expect(TARGET_DIR1).onlyContains([
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
  expect(TARGET_DIR2).onlyContains(["foobar.txt"]);

  await cleandir([TARGET_DIR1, TARGET_DIR2]);

  // AFTER
  expect(TARGET_DIR1).onlyContains([".gitkeep", ".keep"]);
  expect(TARGET_DIR2).onlyContains([]);
});
