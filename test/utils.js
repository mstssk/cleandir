const { promisify } = require("util");
const copyfiles = require("copyfiles");

/**
 * Copyfiles wrapper.
 *
 * @param {string[]} paths
 * @param {copyfiles.Options | number} options
 * @returns {Promise<void>}
 */
exports.copyfiles = promisify(copyfiles);
