/**
 * Determines which Claude code provider should be used based on environment variables.
 *
 * Checks for the presence of specific environment variables to select the provider:
 * - If CLAUDE_CODE_USE_BEDROCK is set, returns "bedrock"
 * - Else if CLAUDE_CODE_USE_VERTEX is set, returns "vertex"
 * - Otherwise, returns "firstParty"
 *
 * @returns {string} The name of the Claude code provider to use ("bedrock", "vertex", or "firstParty").
 */
function getClaudeCodeProvider() {
  // Check if the Bedrock provider should be used
  if (process.env.CLAUDE_CODE_USE_BEDROCK) {
    return "bedrock";
  }
  // Check if the Vertex provider should be used
  if (process.env.CLAUDE_CODE_USE_VERTEX) {
    return "vertex";
  }
  // Default to the first-party provider
  return "firstParty";
}

module.exports = getClaudeCodeProvider;
