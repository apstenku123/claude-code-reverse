/**
 * Replaces the first occurrence of '/./' in the given path string with '/'.
 *
 * This function is useful for normalizing file or URL paths by removing unnecessary single dot segments.
 *
 * @param {string} path - The path string to normalize.
 * @returns {string} The normalized path string with the first '/./' replaced by '/'.
 */
function replaceSingleDotWithSlash(path) {
  // Replace the first occurrence of '/./' with '/'
  return path.replace("/./", "/");
}

module.exports = replaceSingleDotWithSlash;
