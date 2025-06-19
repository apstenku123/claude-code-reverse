/**
 * Generates an OAuth 2.0 authorization URL with PKCE (Proof Key for Code Exchange) support.
 *
 * This function constructs an authorization URL for OAuth 2.0 flows, ensuring the authorization server supports
 * the required response type and code challenge method. It generates a code verifier and code challenge using
 * the external generateCodeVerifierAndChallenge function, and returns the URL along with the code verifier for later token exchange.
 *
 * @async
 * @param {string} issuerBaseUrl - The base URL of the OAuth 2.0 issuer (used if metadata is not provided).
 * @param {Object} options - Additional options for URL generation.
 * @param {Object} [options.metadata] - The OpenID Connect metadata from the authorization server.
 * @param {Object} options.clientInformation - Information about the OAuth client (must include client_id).
 * @param {string} options.redirectUrl - The redirect URI to use after authorization.
 * @returns {Promise<{authorizationUrl: URL, codeVerifier: string}>} An object containing the authorization URL and the code verifier.
 * @throws {Error} If the authorization server does not support required response types or code challenge methods.
 */
async function generateAuthorizationUrlWithPKCE(
  issuerBaseUrl,
  {
    metadata: authorizationServerMetadata,
    clientInformation,
    redirectUrl
  }
) {
  let authorizationUrl;

  // If metadata is provided, validate server capabilities and use its authorization endpoint
  if (authorizationServerMetadata) {
    authorizationUrl = new URL(authorizationServerMetadata.authorization_endpoint);

    // Ensure the server supports 'code' response type
    if (!authorizationServerMetadata.response_types_supported.includes("code")) {
      throw new Error("Incompatible auth server: does not support response type code");
    }

    // Ensure the server supports 'S256' code challenge method
    if (
      !authorizationServerMetadata.code_challenge_methods_supported ||
      !authorizationServerMetadata.code_challenge_methods_supported.includes("S256")
    ) {
      throw new Error("Incompatible auth server: does not support code challenge method S256");
    }
  } else {
    // Fallback: construct the authorization endpoint from the base URL
    authorizationUrl = new URL("/authorize", issuerBaseUrl);
  }

  // Generate PKCE code verifier and code challenge
  const pkceData = await generateCodeVerifierAndChallenge();
  const codeVerifier = pkceData.code_verifier;
  const codeChallenge = pkceData.code_challenge;

  // Set required query parameters for the authorization request
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("client_id", clientInformation.client_id);
  authorizationUrl.searchParams.set("code_challenge", codeChallenge);
  authorizationUrl.searchParams.set("code_challenge_method", "S256");
  authorizationUrl.searchParams.set("redirect_uri", String(redirectUrl));

  return {
    authorizationUrl,
    codeVerifier
  };
}

module.exports = generateAuthorizationUrlWithPKCE;
