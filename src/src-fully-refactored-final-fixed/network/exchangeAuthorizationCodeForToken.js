/**
 * Exchanges an OAuth 2.0 authorization code for an access token using the token endpoint.
 *
 * @param {string} baseUrl - The base URL to use if metadata is not provided.
 * @param {Object} options - The options required for the token exchange.
 * @param {Object} options.metadata - The authorization server metadata (may include token_endpoint and grant_types_supported).
 * @param {Object} options.clientInformation - The OAuth client information (must include client_id, may include client_secret).
 * @param {string} options.authorizationCode - The authorization code received from the authorization server.
 * @param {string} options.codeVerifier - The PKCE code verifier used in the authorization request.
 * @param {string} options.redirectUri - The redirect URI used in the authorization request.
 * @returns {Promise<Object>} The parsed token response from the authorization server.
 * @throws {Error} If the server does not support the authorization_code grant type or if the HTTP request fails.
 */
async function exchangeAuthorizationCodeForToken(
  baseUrl,
  {
    metadata,
    clientInformation,
    authorizationCode,
    codeVerifier,
    redirectUri
  }
) {
  let tokenEndpointUrl;

  // Determine the token endpoint URL from metadata or fallback to default
  if (metadata) {
    tokenEndpointUrl = new URL(metadata.token_endpoint);
    // Ensure the server supports the authorization_code grant type
    if (
      metadata.grant_types_supported &&
      !metadata.grant_types_supported.includes("authorization_code")
    ) {
      throw new Error(
        "Incompatible auth server: does not support grant type authorization_code"
      );
    }
  } else {
    tokenEndpointUrl = new URL("/token", baseUrl);
  }

  // Prepare the request body as application/x-www-form-urlencoded
  const requestBody = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientInformation.client_id,
    code: authorizationCode,
    code_verifier: codeVerifier,
    redirect_uri: String(redirectUri)
  });

  // Include client_secret if present (for confidential clients)
  if (clientInformation.client_secret) {
    requestBody.set("client_secret", clientInformation.client_secret);
  }

  // Send the token request
  const response = await fetch(tokenEndpointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: requestBody
  });

  // Throw an error if the response is not successful
  if (!response.ok) {
    throw new Error(`Token exchange failed: HTTP ${response.status}`);
  }

  // Parse and return the token response using the Jl1 parser
  return Jl1.parse(await response.json());
}

module.exports = exchangeAuthorizationCodeForToken;
