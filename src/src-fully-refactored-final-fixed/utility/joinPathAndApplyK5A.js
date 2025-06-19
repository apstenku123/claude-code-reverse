/**
 * Joins multiple path segments into a single string separated by slashes and processes the result with normalizePath.
 *
 * @param {...string} pathSegments - The individual path segments to join.
 * @returns {string} The result of passing the joined path string to the normalizePath function.
 */
function joinPathAndApplyK5A(...pathSegments) {
  // Join all provided path segments into a single string separated by '/'
  const joinedPath = pathSegments.join("/");
  // Pass the joined path to the normalizePath function and return its result
  return normalizePath(joinedPath);
}

module.exports = joinPathAndApplyK5A;