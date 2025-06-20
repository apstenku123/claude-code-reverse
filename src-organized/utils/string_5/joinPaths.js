/**
 * Joins multiple path segments into a single normalized path string.
 * Handles absolute and relative paths, removes redundant slashes, and ensures proper leading/trailing slashes.
 *
 * @param {...string} pathSegments - The path segments to join. Each segment can be a string or falsy (ignored).
 * @returns {string} The normalized, joined path string.
 */
function joinPaths(...pathSegments) {
  let joinedPath = "";
  let isAbsolutePath = false;

  // Iterate from the last segment to the first, building the path
  for (let index = pathSegments.length - 1; index >= -1 && !isAbsolutePath; index--) {
    // Use '/' as a fallback if index is out of bounds
    const segment = index >= 0 ? pathSegments[index] : "/";
    if (!segment) continue; // Skip falsy segments
    // Prepend the current segment and a slash
    joinedPath = `${segment}/${joinedPath}`;
    // If the segment starts with '/', handleMissingDoctypeError'removeTrailingCharacters hit an absolute path
    isAbsolutePath = segment.charAt(0) === "/";
  }

  // Split into parts, filter out empty strings, and normalize
  const parts = joinedPath.split("/").filter(part => !!part);
  // normalizePathSegments is assumed to normalize the path array (e.g., handle '.' and '..')
  const normalizedParts = normalizePathSegments(parts, !isAbsolutePath);
  const normalizedPath = normalizedParts.join("/");

  // Add leading slash if absolute, or return '.' if result is empty
  return (isAbsolutePath ? "/" : "") + normalizedPath || ".";
}

module.exports = joinPaths;