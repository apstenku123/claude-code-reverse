/**
 * Checks if the given path string is an absolute path (starts with a forward slash).
 *
 * @param {string} path - The path string to check.
 * @returns {boolean} True if the path is absolute, false otherwise.
 */
const isPathAbsolute = (path) => {
  // An absolute path in Unix-like systems starts with '/'
  return path.startsWith("/");
};

module.exports = isPathAbsolute;