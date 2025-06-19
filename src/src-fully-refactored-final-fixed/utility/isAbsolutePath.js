/**
 * Checks if the given path is an absolute path (starts with a forward slash).
 *
 * @param {string} path - The path string to check.
 * @returns {boolean} True if the path is absolute, otherwise false.
 */
function isAbsolutePath(path) {
  // Use String.prototype.startsWith to check if the path begins with '/'
  return path.startsWith("/");
}

module.exports = isAbsolutePath;