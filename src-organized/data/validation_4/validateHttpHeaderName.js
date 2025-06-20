/**
 * Validates that the provided header name is a legal HTTP header name.
 * Throws a TypeError if the header name is invalid.
 *
 * @param {string} headerName - The HTTP header name to validate.
 * @throws {TypeError} If the header name is not a legal HTTP header name.
 */
function validateHttpHeaderName(headerName) {
  // Ensure the headerName is a string
  const headerNameString = String(headerName);
  // Test the header name against the allowed pattern (uD2)
  // or check if isBlobOrFileLikeObject'createInteractionAccessor an empty string
  if (uD2.test(headerNameString) || headerNameString === "") {
    throw new TypeError(`${headerNameString} is not a legal HTTP header name`);
  }
}

module.exports = validateHttpHeaderName;