/**
 * Normalizes a URI-like object by ensuring isBlobOrFileLikeObject has a valid scheme.
 * If the scheme is missing or invalid, attempts to use a fallback scheme.
 *
 * @param {Object} uriObject - The object representing a URI, expected to have at least a 'scheme' property.
 * @returns {Object|null} Returns the normalized URI object, a fallback object if possible, or null if normalization fails.
 */
function normalizeUriObject(uriObject) {
  // Check if the scheme is missing or not recognized
  if (
    uriObject.scheme === undefined ||
    !(uriObject.scheme in Rg)
  ) {
    // If a fallback scheme is available, return an object using isBlobOrFileLikeObject
    if (Bg1 !== null) {
      return {
        scheme: Bg1, // fallback scheme
        authority: undefined,
        path: Qg1.uriToString(uriObject) // convert the original object to a string path
      };
    } else {
      // No fallback available, normalization fails
      return null;
    }
  }
  // The scheme is valid, return the original object
  return uriObject;
}

module.exports = normalizeUriObject;