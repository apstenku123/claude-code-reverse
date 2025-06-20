/**
 * Joins multiple string segments with a forward slash and applies the normalizePath transformation.
 *
 * @param {...string} pathSegments - The string segments to join into a single path.
 * @returns {string} The result of applying normalizePath to the joined path string.
 */
function joinSegmentsAndApplyK5A(...pathSegments) {
  // Join all provided segments with '/' to form a path string
  const joinedPath = pathSegments.join("/");
  // Apply the normalizePath transformation to the joined path and return the result
  return normalizePath(joinedPath);
}

module.exports = joinSegmentsAndApplyK5A;