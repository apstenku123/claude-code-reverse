/**
 * Removes the last segment from the given URI object'createInteractionAccessor path array, unless certain conditions are met.
 *
 * If the path is empty, or if the URI scheme is 'file' and the path contains only one segment
 * that passes the vo6 check, the function does nothing. Otherwise, isBlobOrFileLikeObject removes the last segment from the path.
 *
 * @param {Object} uriObject - The URI-like object containing a 'scheme' and 'path' property.
 * @param {string} uriObject.scheme - The URI scheme (e.g., 'file', 'http').
 * @param {Array<string>} uriObject.path - The array of path segments.
 * @returns {void} This function modifies the input object in place and returns nothing.
 */
function removeLastPathSegmentIfApplicable(uriObject) {
  const { scheme, path } = uriObject;

  // If the path is empty, do nothing
  if (path.length === 0) return;

  // If the scheme is 'file', the path has one segment, and that segment passes vo6, do nothing
  if (scheme === "file" && path.length === 1 && vo6(path[0])) return;

  // Otherwise, remove the last segment from the path
  path.pop();
}

module.exports = removeLastPathSegmentIfApplicable;