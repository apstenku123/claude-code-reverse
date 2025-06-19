/**
 * Determines the Claude code provider type based on environment variables.
 *
 * Checks specific environment variables to decide which Claude code provider is in use:
 * - If CLAUDE_CODE_USE_BEDROCK is set, returns 'bedrock'.
 * - Else if CLAUDE_CODE_USE_VERTEX is set, returns 'vertex'.
 * - Otherwise, returns 'firstParty'.
 *
 * @returns {string} The provider type: 'bedrock', 'vertex', or 'firstParty'.
 */
function getClaudeCodeProviderType() {
  // Check if the Bedrock provider is enabled via environment variable
  if (process.env.CLAUDE_CODE_USE_BEDROCK) {
    return "bedrock";
  }
  // Check if the Vertex provider is enabled via environment variable
  if (process.env.CLAUDE_CODE_USE_VERTEX) {
    return "vertex";
  }
  // Default to first-party provider if no specific provider is set
  return "firstParty";
}

module.exports = getClaudeCodeProviderType;