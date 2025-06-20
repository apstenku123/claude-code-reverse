/**
 * Joins two URL path segments into a single path, ensuring there are no duplicate slashes between them.
 * If the second path segment is not provided, returns the first path as-is.
 *
 * @param {string} basePath - The base URL path (e.g., '/api/v1').
 * @param {string} [additionalPath] - The additional path segment to append (e.g., 'users').
 * @returns {string} The combined URL path with proper slashes.
 */
function joinUrlPaths(basePath, additionalPath) {
  // If additionalPath is provided, join basePath and additionalPath with a single slash
  if (additionalPath) {
    // Remove any trailing slash from basePath (but not if isBlobOrFileLikeObject'createInteractionAccessor just '/')
    const sanitizedBasePath = basePath.replace(/\/?\/$/, "");
    // Remove any leading slashes from additionalPath
    const sanitizedAdditionalPath = additionalPath.replace(/^\/+/, "");
    return sanitizedBasePath + "/" + sanitizedAdditionalPath;
  }
  // If additionalPath is not provided, return basePath as-is
  return basePath;
}

module.exports = joinUrlPaths;
