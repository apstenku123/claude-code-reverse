/**
 * Generates a unique signature string for a given source and HTTP request configuration.
 * The signature is composed of the source identifier and a short hash of the request details.
 *
 * @param {string} sourceIdentifier - a string representing the source or context for the request.
 * @param {Object} requestConfig - The HTTP request configuration object.
 * @param {string} requestConfig.type - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} requestConfig.url - The request URL.
 * @param {Object} [requestConfig.headers] - Optional HTTP headers object.
 * @returns {string} a string in the format `${sourceIdentifier}|${shortHash}` uniquely identifying the request.
 */
function generateRequestSignature(sourceIdentifier, requestConfig) {
  // Serialize the relevant request properties to a JSON string
  const requestDetailsString = JSON.stringify({
    type: requestConfig.type,
    url: requestConfig.url,
    headers: requestConfig.headers || {}
  });

  // Generate a SHA-256 hash of the serialized request details, then take the first 16 hex characters
  const shortHash = WS6("sha256")
    .update(requestDetailsString)
    .digest("hex")
    .substring(0, 16);

  // Combine the source identifier and the short hash to form the signature
  return `${sourceIdentifier}|${shortHash}`;
}

module.exports = generateRequestSignature;