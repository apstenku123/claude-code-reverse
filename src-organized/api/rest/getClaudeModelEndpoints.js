/**
 * Retrieves available Claude model endpoints from Bedrock and returns a mapping of model names to their endpoints.
 * Falls back to default endpoints if any model is missing or if an error occurs during retrieval.
 *
 * @async
 * @returns {Promise<Object>} An object mapping Claude model names to their endpoints.
 */
async function getClaudeModelEndpoints() {
  let availableEndpoints;
  try {
    // Attempt to fetch the list of available Claude model endpoints from Bedrock
    availableEndpoints = await zB0();
  } catch (error) {
    // Log the error and return fallback endpoints if fetching fails
    reportErrorIfAllowed(error);
    return getPoetryMetadataByKey("bedrock");
  }

  // If no endpoints are returned, use fallback endpoints
  if (!availableEndpoints?.length) {
    return getPoetryMetadataByKey("bedrock");
  }

  // Attempt to find specific Claude model endpoints by their unique identifiers
  const haiku35Endpoint = Ob(availableEndpoints, "claude-3-5-haiku-20241022");
  const sonnet35Endpoint = Ob(availableEndpoints, "claude-3-5-sonnet-20241022");
  const sonnet37Endpoint = Ob(availableEndpoints, "claude-3-7-sonnet-20250219");
  const sonnet40Endpoint = Ob(availableEndpoints, "claude-sonnet-4-20250514");
  const opus40Endpoint = Ob(availableEndpoints, "claude-opus-4-20250514");

  // Return an object mapping model names to their endpoints, falling back to defaults if not found
  return {
    haiku35: haiku35Endpoint || xi.bedrock,
    sonnet35: sonnet35Endpoint || ZS.bedrock,
    sonnet37: sonnet37Endpoint || GS.bedrock,
    sonnet40: sonnet40Endpoint || KV.bedrock,
    opus40: opus40Endpoint || fU.bedrock
  };
}

module.exports = getClaudeModelEndpoints;