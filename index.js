const fsSync = require("fs");
const fs = require("fs").promises;
const path = require("path");

const IGNORE_FILES = [".keep", ".gitkeep"];

/**
 * Cleanup directories.
 *
 * @param {string | string[]} dirs
 */
async function cleandir(dirs) {
  if (typeof dirs === "string") {
    dirs = [dirs];
  }
  for (const dir of dirs) {
    await _cleandir(dir);
  }
}

/**
 * Cleanup specified directory.
 *
 * @param {string} dir
 */
async function _cleandir(dir) {
  if (!fsSync.existsSync(dir)) {
    return;
  }
  const stat = await fs.stat(dir);
  if (!stat.isDirectory()) {
    throw new Error(`'${dir}' is not a directory.`);
  }
  let files = await fs.readdir(dir, { withFileTypes: true });
  files = files.filter((f) => !IGNORE_FILES.includes(f.name));
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await fs.rmdir(filePath, { recursive: true });
    } else {
      await fs.unlink(filePath);
    }
  }
}

exports.cleandir = cleandir;
