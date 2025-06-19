/**
 * Constructs an OAuth 2.0 authorization URL with PKCE support.
 *
 * This function builds an authorization URL for OAuth 2.0 authorization code flow with PKCE (Proof Key for Code Exchange).
 * It validates the provided authorization server metadata for required capabilities and generates a code verifier/challenge pair.
 *
 * @async
 * @param {string} issuerBaseUrl - The base URL of the OAuth 2.0 issuer (used if metadata is not provided).
 * @param {Object} options - Options for building the authorization URL.
 * @param {Object} [options.metadata] - The authorization server metadata (from discovery endpoint). Optional.
 * @param {Object} options.clientInformation - The client information, must include client_id.
 * @param {string} options.redirectUrl - The redirect URI to use for the authorization request.
 * @returns {Promise<{authorizationUrl: URL, codeVerifier: string}>} An object containing the constructed authorization URL and the generated code verifier.
 * @throws {Error} If the authorization server does not support required response types or code challenge methods.
 */
async function buildAuthorizationUrlWithPkce(
  issuerBaseUrl,
  {
    metadata: authorizationServerMetadata,
    clientInformation,
    redirectUrl
  }
) {
  let authorizationUrl;

  // If metadata is provided, validate required capabilities and use its authorization endpoint
  if (authorizationServerMetadata) {
    authorizationUrl = new URL(authorizationServerMetadata.authorization_endpoint);

    // Ensure the server supports the 'code' response type
    if (!authorizationServerMetadata.response_types_supported.includes("code")) {
      throw new Error("Incompatible auth server: does not support response type code");
    }

    // Ensure the server supports the 'S256' code challenge method
    if (
      !authorizationServerMetadata.code_challenge_methods_supported ||
      !authorizationServerMetadata.code_challenge_methods_supported.includes("S256")
    ) {
      throw new Error("Incompatible auth server: does not support code challenge method S256");
    }
  } else {
    // Fallback: construct the authorization URL from the base issuer URL
    authorizationUrl = new URL("/authorize", issuerBaseUrl);
  }

  // Generate PKCE code verifier and challenge
  const pkce = await generateCodeVerifierAndChallenge(); // { code_verifier, code_challenge }
  const codeVerifier = pkce.code_verifier;
  const codeChallenge = pkce.code_challenge;

  // Set required OAuth 2.0 query parameters
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

module.exports = buildAuthorizationUrlWithPkce;
