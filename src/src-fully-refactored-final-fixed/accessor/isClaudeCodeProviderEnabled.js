/**
 * Checks if either the Bedrock or Vertex Claude code provider is enabled via environment variables.
 *
 * @returns {boolean} True if either CLAUDE_CODE_USE_BEDROCK or CLAUDE_CODE_USE_VERTEX environment variable is set to a truthy value, otherwise false.
 */
const isClaudeCodeProviderEnabled = () => {
  // Check if either environment variable is set (truthy)
  const isBedrockEnabled = Boolean(process.env.CLAUDE_CODE_USE_BEDROCK);
  const isVertexEnabled = Boolean(process.env.CLAUDE_CODE_USE_VERTEX);
  return isBedrockEnabled || isVertexEnabled;
};

module.exports = isClaudeCodeProviderEnabled;