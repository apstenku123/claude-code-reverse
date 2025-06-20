/**
 * Parses a URI string and extracts its scheme, authority, and path components.
 *
 * @param {string} uriString - The URI string to parse.
 * @returns {Object|null} An object containing the scheme, authority, and path if parsing succeeds; otherwise, null.
 */
function parseUriComponents(uriString) {
  // Execute the regular expression to extract URI components
  const matchResult = T96.exec(uriString);
  if (matchResult === null) {
    // Return null if the string does not match the expected URI format
    return null;
  }
  // Return an object with the extracted URI components
  return {
    scheme: matchResult[1],
    authority: matchResult[2],
    path: matchResult[3]
  };
}

module.exports = parseUriComponents;