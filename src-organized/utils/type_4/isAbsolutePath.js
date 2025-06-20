/**
 * Checks if the provided path is an absolute path (starts with a forward slash).
 *
 * @param {string} path - The file system path to check.
 * @returns {boolean} True if the path is absolute, false otherwise.
 */
function isAbsolutePath(path) {
  // An absolute path in Unix-like systems starts with '/'
  return path.charAt(0) === '/';
}

module.exports = isAbsolutePath;