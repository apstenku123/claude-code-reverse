/**
 * Removes a trailing slash from the end of a path string, if present.
 *
 * @param {string} path - The path string to process.
 * @returns {string} The path string without a trailing slash, or the original string if no trailing slash exists.
 */
function removeTrailingSlash(path) {
  // Check if the last character is a slash
  if (path[path.length - 1] === "/") {
    // Remove the trailing slash
    return path.slice(0, -1);
  }
  // Return the original path if no trailing slash
  return path;
}

module.exports = removeTrailingSlash;