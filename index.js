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
  let files;
  try {
    files = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    switch (err.code) {
      case "ENOENT":
        return null; // Noop when directory don't exists.
      case "ENOTDIR":
        throw new Error(`'${dir}' is not a directory.`, err);
      default:
        throw err;
    }
  }
  files = files.filter((f) => !IGNORE_FILES.includes(f.name));
  const promises = files.map((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      return fs.rmdir(filePath, { recursive: true });
    } else {
      return fs.unlink(filePath);
    }
  });
  return Promise.all(promises);
}

exports.cleandir = cleandir;
