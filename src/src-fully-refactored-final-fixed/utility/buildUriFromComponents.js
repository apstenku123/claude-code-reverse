/**
 * Constructs a URI string from the given URI components object.
 *
 * @param {Object} uriComponents - An object containing parts of a URI.
 * @param {string} [uriComponents.scheme] - The URI scheme (e.g., 'http', 'https').
 * @param {string} [uriComponents.authority] - The authority component (e.g., 'user@host:port').
 * @param {string} uriComponents.path - The path component of the URI.
 * @returns {string} The constructed URI string based on the provided components.
 */
function buildUriFromComponents(uriComponents) {
  let uriString = "";

  // Append scheme if provided
  if (uriComponents.scheme !== undefined) {
    uriString += uriComponents.scheme + ":";
  }

  // Append authority if provided, with leading '//' and trailing '/'
  if (uriComponents.authority !== undefined) {
    uriString += "//" + uriComponents.authority + "/";
  }

  // Always append the path
  uriString += uriComponents.path;

  return uriString;
}

module.exports = buildUriFromComponents;