/**
 * Normalizes an array of path segments by resolving '.' and '..' entries.
 * Removes current directory references ('.'), resolves parent directory references ('..'),
 * and optionally prepends unresolved '..' segments if allowAboveRoot is true.
 *
 * @param {string[]} pathSegments - The array of path segments to normalize (mutated in-place).
 * @param {boolean} allowAboveRoot - If true, unresolved '..' segments are prepended to the result.
 * @returns {string[]} The normalized array of path segments.
 */
function normalizePathSegments(pathSegments, allowAboveRoot) {
  let parentDirCount = 0;
  // Iterate backwards through the path segments
  for (let i = pathSegments.length - 1; i >= 0; i--) {
    const segment = pathSegments[i];
    if (segment === ".") {
      // Remove current directory references
      pathSegments.splice(i, 1);
    } else if (segment === "..") {
      // Remove '..' and increment unresolved parent directory count
      pathSegments.splice(i, 1);
      parentDirCount++;
    } else if (parentDirCount > 0) {
      // Remove a segment for each unresolved '..'
      pathSegments.splice(i, 1);
      parentDirCount--;
    }
  }
  // If allowed, prepend any remaining '..' segments
  if (allowAboveRoot) {
    while (parentDirCount-- > 0) {
      pathSegments.unshift("..");
    }
  }
  return pathSegments;
}

module.exports = normalizePathSegments;