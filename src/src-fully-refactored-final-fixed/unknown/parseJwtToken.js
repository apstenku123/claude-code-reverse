/**
 * Parses a JWT token string and extracts its header, payload, and signature.
 * Optionally parses the payload as JSON if the token type is 'JWT' or if specified in the config.
 *
 * @param {string} tokenString - The JWT token string to parse.
 * @param {Object} [options={}] - Optional configuration for parsing.
 * @param {boolean} [options.json=false] - If true, always parse the payload as JSON.
 * @param {function} [options.encoding] - Optional JSON.parse reviver function.
 * @returns {Object|null} An object with 'header', 'payload', and 'signature' properties, or null if parsing fails.
 */
function parseJwtToken(tokenString, options = {}) {
  // Normalize and validate the token string
  const normalizedToken = GJ2(tokenString);
  if (!YJ2(normalizedToken)) {
    return null;
  }

  // Extract the JWT header
  const header = ZJ2(normalizedToken);
  if (!header) {
    return null;
  }

  // Extract the JWT payload
  let payload = N05(normalizedToken);

  // Parse payload as JSON if token type is JWT or if options.json is true
  if (header.typ === "JWT" || options.json) {
    payload = JSON.parse(payload, options.encoding);
  }

  // Extract the JWT signature
  const signature = DJ2(normalizedToken);

  return {
    header,
    payload,
    signature
  };
}

module.exports = parseJwtToken;