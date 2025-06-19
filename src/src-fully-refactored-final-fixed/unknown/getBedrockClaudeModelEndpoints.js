/**
 * Retrieves available Claude model endpoints from Bedrock and provides fallbacks if not found.
 *
 * Attempts to fetch the list of available Claude model endpoints from the Bedrock service. If the fetch fails or no endpoints are found, returns a fallback value. Otherwise, returns an object mapping model keys to their corresponding endpoint strings, with sensible fallbacks for each model if not present in the list.
 *
 * @async
 * @returns {Promise<Object>} An object containing endpoint strings for each Claude model, or fallback values if not available.
 */
async function getBedrockClaudeModelEndpoints() {
  let availableEndpoints;
  try {
    // Attempt to fetch available endpoints from Bedrock
    availableEndpoints = await zB0();
  } catch (error) {
    // Log the error and return fallback for Bedrock
    reportErrorIfAllowed(error);
    return getPoetryMetadataByKey("bedrock");
  }

  // If no endpoints are returned, fallback to Bedrock
  if (!availableEndpoints?.length) {
    return getPoetryMetadataByKey("bedrock");
  }

  // Helper function: find the first endpoint containing a specific model substring
  // (Ob: findStringContainingSubstring)
  const haiku35Endpoint = Ob(availableEndpoints, "claude-3-5-haiku-20241022");
  const sonnet35Endpoint = Ob(availableEndpoints, "claude-3-5-sonnet-20241022");
  const sonnet37Endpoint = Ob(availableEndpoints, "claude-3-7-sonnet-20250219");
  const sonnet40Endpoint = Ob(availableEndpoints, "claude-sonnet-4-20250514");
  const opus40Endpoint = Ob(availableEndpoints, "claude-opus-4-20250514");

  // Return an object mapping model keys to endpoints, with fallbacks if not found
  return {
    haiku35: haiku35Endpoint || xi.bedrock, // fallback to xi.bedrock
    sonnet35: sonnet35Endpoint || ZS.bedrock, // fallback to ZS.bedrock
    sonnet37: sonnet37Endpoint || GS.bedrock, // fallback to GS.bedrock
    sonnet40: sonnet40Endpoint || KV.bedrock, // fallback to KV.bedrock
    opus40: opus40Endpoint || fU.bedrock // fallback to fU.bedrock
  };
}

module.exports = getBedrockClaudeModelEndpoints;