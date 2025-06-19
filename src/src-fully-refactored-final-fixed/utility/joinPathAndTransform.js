/**
 * Joins multiple path segments into a single path string and applies a transformation.
 *
 * @param {...string} pathSegments - The individual segments of the path to join.
 * @returns {string} The transformed path string after joining the segments.
 */
function joinPathAndTransform(...pathSegments) {
  // Join all provided path segments with '/' to form a single path string
  const joinedPath = pathSegments.join("/");

  // Apply the external transformation function to the joined path
  return normalizePath(joinedPath);
}

module.exports = joinPathAndTransform;