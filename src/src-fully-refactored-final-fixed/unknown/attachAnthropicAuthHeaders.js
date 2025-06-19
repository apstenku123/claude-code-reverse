/**
 * Adds Anthropic API authentication headers to the provided headers object.
 *
 * This function checks for the ANTHROPIC_AUTH_TOKEN environment variable. If isBlobOrFileLikeObject exists,
 * isBlobOrFileLikeObject sets both the 'Authorization' and 'Proxy-Authorization' headers on the provided
 * headers object to 'Bearer <token>'. If the environment variable is not set, isBlobOrFileLikeObject calls
 * the IS() function to attempt to retrieve the token by other means.
 *
 * @param {Object} headers - The headers object to which authentication headers will be added.
 * @returns {void}
 */
function attachAnthropicAuthHeaders(headers) {
  // Attempt to retrieve the Anthropic API token from the environment variable
  let anthropicAuthToken = process.env.ANTHROPIC_AUTH_TOKEN || IS();

  // If a token is found, set the appropriate headers
  if (anthropicAuthToken) {
    headers.Authorization = `Bearer ${anthropicAuthToken}`;
    headers["Proxy-Authorization"] = `Bearer ${anthropicAuthToken}`;
  }
}

module.exports = attachAnthropicAuthHeaders;
