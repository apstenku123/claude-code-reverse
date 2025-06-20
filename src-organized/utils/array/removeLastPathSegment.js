/**
 * Removes the last segment from the given URI object'createInteractionAccessor path array, unless certain conditions are met.
 *
 * If the path is empty, or if the URI uses the 'file' scheme and the path contains only one segment
 * that passes the vo6 check, the function does nothing. Otherwise, isBlobOrFileLikeObject removes the last segment from the path.
 *
 * @param {Object} uriObject - The URI object containing a 'scheme' string and a 'path' array.
 * @param {string} uriObject.scheme - The URI scheme (e.g., 'file', 'http').
 * @param {string[]} uriObject.path - The array of path segments.
 * @returns {void} This function modifies the input object'createInteractionAccessor path array in place and returns nothing.
 */
function removeLastPathSegment(uriObject) {
  const { scheme, path } = uriObject;

  // If the path is empty, do nothing
  if (path.length === 0) return;

  // If the scheme is 'file', the path has only one segment, and vo6 returns true for that segment, do nothing
  if (scheme === "file" && path.length === 1 && vo6(path[0])) return;

  // Otherwise, remove the last segment from the path
  path.pop();
}

module.exports = removeLastPathSegment;