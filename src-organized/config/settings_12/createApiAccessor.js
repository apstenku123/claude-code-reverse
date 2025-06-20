/**
 * Creates and returns an API accessor instance based on environment configuration and provided options.
 * Handles authentication, retry logic, and selects the appropriate backend (Bedrock, Vertex, or default).
 *
 * @param {Object} options - Configuration options for the accessor.
 * @param {string} options.apiKey - The API key to use for authentication (if required).
 * @param {number} [options.maxRetries=0] - The maximum number of retry attempts for API requests.
 * @param {string} options.model - The model identifier to use (may affect backend selection).
 * @param {boolean} options.isNonInteractiveSession - Whether the session is non-interactive (affects API key selection).
 * @param {boolean} [options.isSmallFastModel=false] - Whether to use a small/fast model (affects Bedrock region selection).
 * @returns {Promise<Object>} An instance of the appropriate API accessor (Bedrock, Vertex, or default).
 */
async function createApiAccessor({
  apiKey,
  maxRetries = 0,
  model,
  isNonInteractiveSession,
  isSmallFastModel = false
}) {
  // Prepare default headers for all requests
  const defaultHeaders = {
    "x-app": "cli",
    "User-Agent": ZO(),
    ...parseAnthropicCustomHeaders()
  };

  // Ensure access token is refreshed if needed
  await refreshAccessTokenWithLock();

  // Check for existing authentication token
  const hasAuthToken = R6();
  if (!hasAuthToken) {
    // If no auth token, perform additional header setup (possibly for login)
    attachAnthropicAuthToken(defaultHeaders);
  }

  // Common configuration for all API clients
  const baseConfig = {
    defaultHeaders,
    maxRetries,
    timeout: parseInt(process.env.API_TIMEOUT_MS || String(60000), 10),
    dangerouslyAllowBrowser: true,
    fetchOptions: getCurrentDispatcher()
  };

  // If Bedrock backend is enabled via environment variable
  if (process.env.CLAUDE_CODE_USE_BEDROCK) {
    // Determine AWS region for Bedrock
    const awsRegion = isSmallFastModel && process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION_AWS_REGION
      ? process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION_AWS_REGION
      : Tb();
    // Merge config, optionally skip Bedrock auth
    const bedrockConfig = {
      ...baseConfig,
      awsRegion,
      ...(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH && { skipAuth: true })
    };
    return new qC1(bedrockConfig);
  }

  // If Vertex backend is enabled via environment variable
  if (process.env.CLAUDE_CODE_USE_VERTEX) {
    // Merge config, set region, optionally skip Vertex auth
    const vertexConfig = {
      ...baseConfig,
      region: getVertexRegionForClaudeModel(model),
      ...(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH && {
        googleAuth: {
          getClient: () => ({
            getRequestHeaders: () => ({})
          })
        }
      })
    };
    return new DV1(vertexConfig);
  }

  // Default backend configuration
  const defaultApiConfig = {
    // If handleMissingDoctypeError have an auth token, API key is null; otherwise, use provided apiKey or fallback
    apiKey: hasAuthToken ? null : apiKey || getAnthropicApiKey(isNonInteractiveSession),
    authToken: hasAuthToken ? X3()?.accessToken : undefined,
    ...baseConfig
  };
  return new Nw(defaultApiConfig);
}

module.exports = createApiAccessor;