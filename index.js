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
 * @param {string} dirPath
 */
async function _cleandir(dirPath) {
  let dir;
  try {
    dir = await fs.opendir(dirPath);
  } catch (err) {
    switch (err.code) {
      case "ENOENT":
        return null; // Noop when directory don't exists.
      case "ENOTDIR":
        throw new Error(`'${dirPath}' is not a directory.`, err);
      default:
        throw err;
    }
  }
  for await (const file of dir) {
    if (IGNORE_FILES.includes(file.name)) {
      continue;
    }
    const filePath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      await fs.rmdir(filePath, { recursive: true });
    } else {
      await fs.unlink(filePath);
    }
  }
}

exports.cleandir = cleandir;
