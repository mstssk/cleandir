import * as fs from "node:fs/promises";
import * as path from "node:path";

const IGNORE_FILES = [".keep", ".gitkeep"];

/**
 * Cleanup directories.
 *
 * @param {string | string[]} dirs
 */
export async function cleandir(dirs: string | string[]): Promise<void> {
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
async function _cleandir(dirPath: string): Promise<void> {
  let dir;
  try {
    dir = await fs.opendir(dirPath);
  } catch (err: any) {
    switch (err.code) {
      case "ENOENT":
        return; // Noop when directory don't exists.
      case "ENOTDIR":
        throw new Error(`'${dirPath}' is not a directory.`);
      default:
        throw err;
    }
  }
  for await (const file of dir) {
    if (IGNORE_FILES.includes(file.name)) {
      continue;
    }
    const filePath = path.join(dirPath, file.name);
    await fs.rm(filePath, { recursive: true });
  }
}
