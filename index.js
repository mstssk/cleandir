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
  const stat = await fsStatIgnoreENOENT(dir);
  if (stat == null) {
    return;
  }
  if (!stat.isDirectory()) {
    throw new Error(`'${dir}' is not a directory.`);
  }
  let files = await fs.readdir(dir, { withFileTypes: true });
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

async function fsStatIgnoreENOENT(path) {
  try {
    return await fs.stat(path);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Noop when directory don't exists.
      return null;
    }
    throw err;
  }
}

exports.cleandir = cleandir;
