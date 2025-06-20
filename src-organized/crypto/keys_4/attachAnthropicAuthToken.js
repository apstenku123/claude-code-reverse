/**
 * Adds the Anthropic authentication token to the provided headers object if available.
 *
 * This function checks for the ANTHROPIC_AUTH_TOKEN environment variable or retrieves a token using the IS() function.
 * If a token is found, isBlobOrFileLikeObject sets the 'Authorization' and 'Proxy-Authorization' headers on the provided headers object.
 *
 * @param {Object} headers - The headers object to which the authentication tokens will be attached.
 * @returns {void}
 */
function attachAnthropicAuthToken(headers) {
  // Attempt to get the token from the environment variable or fallback to IS()
  const anthropicAuthToken = process.env.ANTHROPIC_AUTH_TOKEN || IS();

  if (anthropicAuthToken) {
    // Set both Authorization and Proxy-Authorization headers with the Bearer token
    headers.Authorization = `Bearer ${anthropicAuthToken}`;
    headers["Proxy-Authorization"] = `Bearer ${anthropicAuthToken}`;
  }
}

module.exports = attachAnthropicAuthToken;
