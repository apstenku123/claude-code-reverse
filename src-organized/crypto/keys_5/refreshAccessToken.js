/**
 * Refreshes an OAuth access token using a refresh token and client credentials.
 *
 * @async
 * @param {string} issuerBaseUrl - The base URL of the OAuth issuer (used if metadata is not provided).
 * @param {Object} options - Options for the token refresh.
 * @param {Object} [options.metadata] - OAuth server metadata, including token endpoint and supported grant types.
 * @param {Object} options.clientInformation - Client credentials (client_id and optionally client_secret).
 * @param {string} options.refreshToken - The refresh token to use for obtaining a new access token.
 * @returns {Promise<any>} The parsed response from the token endpoint (via Jl1.parse).
 * @throws {Error} If the auth server does not support refresh_token grant type, or if the HTTP request fails.
 */
async function refreshAccessToken(
  issuerBaseUrl,
  {
    metadata: oauthMetadata,
    clientInformation,
    refreshToken
  }
) {
  let tokenEndpointUrl;

  // Determine the token endpoint URL
  if (oauthMetadata) {
    tokenEndpointUrl = new URL(oauthMetadata.token_endpoint);
    // Ensure the server supports the refresh_token grant type
    if (
      oauthMetadata.grant_types_supported &&
      !oauthMetadata.grant_types_supported.includes("refresh_token")
    ) {
      throw new Error(
        "Incompatible auth server: does not support grant type refresh_token"
      );
    }
  } else {
    // Fallback: construct token endpoint relative to issuer base URL
    tokenEndpointUrl = new URL("/token", issuerBaseUrl);
  }

  // Prepare the request body as application/x-www-form-urlencoded
  const requestBody = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientInformation.client_id,
    refresh_token: refreshToken
  });

  // Include client_secret if available
  if (clientInformation.client_secret) {
    requestBody.set("client_secret", clientInformation.client_secret);
  }

  // Make the POST request to the token endpoint
  const response = await fetch(tokenEndpointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: requestBody
  });

  // Throw an error if the response is not successful
  if (!response.ok) {
    throw new Error(`Token refresh failed: HTTP ${response.status}`);
  }

  // Parse and return the response using Jl1.parse
  return Jl1.parse(await response.json());
}

module.exports = refreshAccessToken;
