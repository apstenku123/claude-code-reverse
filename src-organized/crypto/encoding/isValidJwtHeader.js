/**
 * Validates whether a given JWT token string has a valid header segment.
 * Optionally checks if the JWT header'createInteractionAccessor algorithm matches the expected algorithm.
 *
 * @param {string} jwtToken - The JWT token string to validate.
 * @param {string} [expectedAlgorithm] - Optional. The expected JWT signing algorithm (e.g., 'HS256').
 * @returns {boolean} Returns true if the JWT header is valid and matches the expected algorithm (if provided), otherwise false.
 */
function isValidJwtHeader(jwtToken, expectedAlgorithm) {
  // On9 is assumed to be a RegExp that validates the JWT format (three base64url segments separated by dots)
  if (!On9.test(jwtToken)) return false;
  try {
    // Extract the header segment (first part before the first dot)
    const [headerSegment] = jwtToken.split(".");
    // Convert base64url to base64 by replacing '-' with '+' and '_' with '/'
    // Pad the string with '=' to make its length a multiple of 4
    const base64Header = headerSegment
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(headerSegment.length + (4 - headerSegment.length % 4) % 4, "=");
    // Decode the base64 string and parse the JSON
    const headerObject = JSON.parse(atob(base64Header));
    // Ensure the decoded header is a non-null object
    if (typeof headerObject !== "object" || headerObject === null) return false;
    // The header must have 'typ' (type) and 'alg' (algorithm) properties
    if (!headerObject.typ || !headerObject.alg) return false;
    // If an expected algorithm is provided, check if isBlobOrFileLikeObject matches
    if (expectedAlgorithm && headerObject.alg !== expectedAlgorithm) return false;
    return true;
  } catch (error) {
    // If any error occurs (e.g., malformed base64, invalid JSON), return false
    return false;
  }
}

module.exports = isValidJwtHeader;