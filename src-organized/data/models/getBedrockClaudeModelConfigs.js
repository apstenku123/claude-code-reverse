/**
 * Retrieves and maps Claude model configurations from Bedrock.
 *
 * This function fetches a list of available Claude models from Bedrock, attempts to extract specific model configurations,
 * and returns an object mapping model keys to their configuration objects. If fetching fails or no models are found,
 * isBlobOrFileLikeObject returns a fallback configuration. Each model key falls back to a default if not found in the fetched list.
 *
 * @async
 * @returns {Object} An object containing configuration objects for various Claude models, or fallback defaults.
 */
async function getBedrockClaudeModelConfigs() {
  let availableModels;
  try {
    // Attempt to fetch the list of available Claude models from Bedrock
    availableModels = await zB0();
  } catch (fetchError) {
    // Log the error and return the fallback configuration if fetching fails
    reportErrorIfAllowed(fetchError);
    return getPoetryMetadataByKey("bedrock");
  }

  // If no models are returned, use the fallback configuration
  if (!availableModels?.length) {
    return getPoetryMetadataByKey("bedrock");
  }

  // Attempt to extract specific Claude model configurations by model name
  const haiku35Config = Ob(availableModels, "claude-3-5-haiku-20241022");
  const sonnet35Config = Ob(availableModels, "claude-3-5-sonnet-20241022");
  const sonnet37Config = Ob(availableModels, "claude-3-7-sonnet-20250219");
  const sonnet40Config = Ob(availableModels, "claude-sonnet-4-20250514");
  const opus40Config = Ob(availableModels, "claude-opus-4-20250514");

  // Return an object mapping model keys to their configuration objects, falling back to defaults if not found
  return {
    haiku35: haiku35Config || xi.bedrock,
    sonnet35: sonnet35Config || ZS.bedrock,
    sonnet37: sonnet37Config || GS.bedrock,
    sonnet40: sonnet40Config || KV.bedrock,
    opus40: opus40Config || fU.bedrock
  };
}

module.exports = getBedrockClaudeModelConfigs;