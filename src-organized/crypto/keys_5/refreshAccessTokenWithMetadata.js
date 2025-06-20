/**
 * Refreshes an OAuth access token using a refresh token and optional authorization server metadata.
 *
 * @async
 * @param {string} issuerBaseUrl - The base URL of the OAuth issuer (used if metadata is not provided).
 * @param {Object} options - Options for the token refresh operation.
 * @param {Object} [options.metadata] - Authorization server metadata (including token_endpoint and grant_types_supported).
 * @param {Object} options.clientInformation - Client credentials (client_id and optionally client_secret).
 * @param {string} options.refreshToken - The refresh token to use for obtaining a new access token.
 * @returns {Promise<any>} The parsed response from the token endpoint (typically an access token object).
 * @throws {Error} If the authorization server does not support the refresh_token grant type, or if the HTTP request fails.
 */
async function refreshAccessTokenWithMetadata(
  issuerBaseUrl,
  {
    metadata: authServerMetadata,
    clientInformation,
    refreshToken
  }
) {
  let tokenEndpointUrl;

  // Determine the token endpoint URL
  if (authServerMetadata) {
    tokenEndpointUrl = new URL(authServerMetadata.token_endpoint);

    // Ensure the server supports the refresh_token grant type
    if (
      authServerMetadata.grant_types_supported &&
      !authServerMetadata.grant_types_supported.includes("refresh_token")
    ) {
      throw new Error(
        "Incompatible auth server: does not support grant type refresh_token"
      );
    }
  } else {
    // Fallback to a default /token endpoint relative to the issuer base URL
    tokenEndpointUrl = new URL("/token", issuerBaseUrl);
  }

  // Construct the request body for the token refresh
  const tokenRequestParams = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientInformation.client_id,
    refresh_token: refreshToken
  });

  // Add client_secret if present
  if (clientInformation.client_secret) {
    tokenRequestParams.set("client_secret", clientInformation.client_secret);
  }

  // Send the POST request to the token endpoint
  const response = await fetch(tokenEndpointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: tokenRequestParams
  });

  // Throw an error if the response is not successful
  if (!response.ok) {
    throw new Error(`Token refresh failed: HTTP ${response.status}`);
  }

  // Parse and return the response using Jl1.parse (assumed to be a custom parser)
  return Jl1.parse(await response.json());
}

module.exports = refreshAccessTokenWithMetadata;
