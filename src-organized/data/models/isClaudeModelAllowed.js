/**
 * Determines if a given model identifier is allowed based on the current platform context.
 *
 * @param {string} modelIdentifier - The identifier of the model to check (e.g., 'claude-3-7', 'claude-opus-4').
 * @returns {boolean} True if the model is allowed in the current context, false otherwise.
 */
function isClaudeModelAllowed(modelIdentifier) {
  // Retrieve the current platform context (e.g., 'bedrock', 'firstParty', etc.)
  const platformContext = oQ();

  // If running on 'bedrock', no Claude models are allowed
  if (platformContext === "bedrock") {
    return false;
  }

  // If running on 'firstParty', allow specific Claude models
  if (platformContext === "firstParty") {
    return (
      modelIdentifier.includes("claude-3-7") ||
      modelIdentifier.includes("claude-opus-4") ||
      modelIdentifier.includes("claude-sonnet-4")
    );
  }

  // For all other contexts, only allow Claude Opus 4 and Sonnet 4 models
  return (
    modelIdentifier.includes("claude-opus-4") ||
    modelIdentifier.includes("claude-sonnet-4")
  );
}

module.exports = isClaudeModelAllowed;