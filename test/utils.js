const { promisify } = require("util");
const copyfiles = require("copyfiles");
const glob = require("glob");

/**
 * Copyfiles wrapper.
 *
 * @param {string[]} paths
 * @param {copyfiles.Options | number} options
 * @returns {Promise<void>}
 */
exports.copyfiles = promisify(copyfiles);

/**
 * Glob wrapper.
 *
 * @param {string} pattern
 * @param {glob.IOptions} options
 * @returns {Promise<string[]>} matches
 */
exports.glob = promisify(glob);
