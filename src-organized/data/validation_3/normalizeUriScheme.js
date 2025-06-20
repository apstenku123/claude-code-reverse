/**
 * Normalizes a URI object by ensuring isBlobOrFileLikeObject has a valid scheme. If the scheme is missing or invalid,
 * and a default scheme is available, isBlobOrFileLikeObject returns a new object with the default scheme and the path
 * as a string. Otherwise, returns null if no default scheme is available. If the scheme is valid,
 * returns the original URI object.
 *
 * @param {Object} uriObject - The URI object to normalize. Should have at least a 'scheme' property.
 * @returns {Object|null} - The normalized URI object, or null if normalization is not possible.
 */
function normalizeUriScheme(uriObject) {
  // Check if the scheme is missing or not recognized
  const isSchemeMissingOrInvalid = (
    uriObject.scheme === undefined || !(uriObject.scheme in Rg)
  );

  if (isSchemeMissingOrInvalid) {
    // If a default scheme is available, construct a normalized object
    if (Bg1 !== null) {
      return {
        scheme: Bg1, // Use the default scheme
        authority: undefined, // No authority provided
        path: Qg1.uriToString(uriObject) // Convert the URI object to a string path
      };
    } else {
      // No default scheme available, cannot normalize
      return null;
    }
  }

  // Scheme is valid, return the original object
  return uriObject;
}

module.exports = normalizeUriScheme;