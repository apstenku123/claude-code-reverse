/**
 * Determines if a given model name is allowed based on the current configuration.
 *
 * The function checks the current configuration type (e.g., 'bedrock', 'firstParty', etc.)
 * and returns true if the provided model name is permitted under that configuration.
 *
 * @param {string} modelName - The name of the model to check (e.g., 'claude-3-7', 'claude-opus-4').
 * @returns {boolean} True if the model is allowed for the current configuration, false otherwise.
 */
function isClaudeModelAllowedForConfig(modelName) {
  const configType = oQ(); // Retrieve the current configuration type

  // If the configuration is 'bedrock', no Claude models are allowed
  if (configType === "bedrock") {
    return false;
  }

  // If the configuration is 'firstParty', allow specific Claude models
  if (configType === "firstParty") {
    return (
      modelName.includes("claude-3-7") ||
      modelName.includes("claude-opus-4") ||
      modelName.includes("claude-sonnet-4")
    );
  }

  // For all other configurations, allow only Opus and Sonnet Claude models
  return (
    modelName.includes("claude-opus-4") ||
    modelName.includes("claude-sonnet-4")
  );
}

module.exports = isClaudeModelAllowedForConfig;