/**
 * Determines if the provided path is an absolute path that contains at least one space character and does not end with a space.
 *
 * @param {string} path - The path string to validate.
 * @returns {boolean} True if the path is absolute, contains a space, and does not end with a space; otherwise, false.
 */
function isValidAbsolutePathWithSpaces(path) {
  // Check if the path is an absolute path (starts with '/')
  if (!isAbsolutePath(path)) {
    return false;
  }

  // Check if the path contains at least one space character
  if (!path.includes(" ")) {
    return false;
  }

  // Check if the path does NOT end with a space character
  if (path.endsWith(" ")) {
    return false;
  }

  // All conditions met
  return true;
}

module.exports = isValidAbsolutePathWithSpaces;
