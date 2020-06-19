const __copyfiles = require("copyfiles");
const __glob = require("glob");

/**
 * Copyfiles wrapper.
 *
 * @param {string[]} paths
 * @param {__copyfiles.Options | number} options
 * @returns {Promise<void>}
 */
function copyfiles(paths, options) {
  return new Promise((resolve, reject) => {
    __copyfiles(paths, options, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Glob wrapper.
 *
 * @param {string} pattern
 * @param {__glob.IOptions} options
 * @returns {Promise<string[]>} matches
 */
function glob(pattern, options) {
  return new Promise((resolve, reject) => {
    __glob(pattern, options, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });
}

exports.copyfiles = copyfiles;
exports.glob = glob;
