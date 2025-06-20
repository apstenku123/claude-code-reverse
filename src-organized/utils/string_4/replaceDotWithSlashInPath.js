/**
 * Replaces the first occurrence of "." in a path string with a "/".
 *
 * @param {string} path - The input path string in which the first "." will be replaced by "/".
 * @returns {string} The path string with the first "." replaced by "/".
 */
function replaceDotWithSlashInPath(path) {
  // Replace the first occurrence of '.' with '/' using a regular expression
  return path.replace(/\./, '/');
}

module.exports = replaceDotWithSlashInPath;