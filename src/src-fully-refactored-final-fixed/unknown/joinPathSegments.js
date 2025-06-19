/**
 * Joins multiple path segments into a normalized path string, handling absolute and relative paths.
 *
 * @param {...string} pathSegments - The path segments to join together.
 * @returns {string} The normalized joined path.
 *
 * This function mimics path.join-like behavior:
 * - Handles absolute and relative paths.
 * - Removes redundant slashes.
 * - Returns '.' for empty input.
 * - Uses normalizePathSegments to normalize the path segments (e.g., handling '.' and '..').
 */
function joinPathSegments(...pathSegments) {
  let joinedPath = "";
  let isAbsolute = false;

  // Iterate from the last segment to the first, looking for the first absolute path
  for (let i = pathSegments.length - 1; i >= -1 && !isAbsolute; i--) {
    // Use '/' if handleMissingDoctypeError'removeTrailingCharacters gone past the first segment (for edge case handling)
    const segment = i >= 0 ? pathSegments[i] : "/";
    if (!segment) continue; // Skip empty segments
    // Prepend the segment and a slash to the joined path
    joinedPath = `${segment}/${joinedPath}`;
    // If the segment starts with '/', mark as absolute and stop
    isAbsolute = segment.charAt(0) === "/";
  }

  // Split into segments, filter out empty segments, and normalize using normalizePathSegments
  const normalizedSegments = normalizePathSegments(
    joinedPath.split("/").filter(segment => !!segment),
    !isAbsolute
  );
  const normalizedPath = normalizedSegments.join("/");

  // Prepend '/' if absolute, or return '.' if result is empty
  return (isAbsolute ? "/" : "") + normalizedPath || ".";
}

module.exports = joinPathSegments;