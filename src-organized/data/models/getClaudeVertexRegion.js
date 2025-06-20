/**
 * Returns the appropriate Vertex region environment variable for a given Claude model name.
 * If the environment variable is not set, falls back to the KL() function.
 *
 * @param {string} modelName - The Claude model name to check (e.g., 'claude-3-5-haiku').
 * @returns {string} The region string from the environment variable, or the result of KL() if not set.
 */
function getClaudeVertexRegion(modelName) {
  // Check if modelName is defined and starts with a known Claude model prefix
  if (modelName?.startsWith("claude-3-5-haiku")) {
    // Return the region for Claude 3.5 Haiku, or fallback
    return process.env.VERTEX_REGION_CLAUDE_3_5_HAIKU || KL();
  }
  if (modelName?.startsWith("claude-3-5-sonnet")) {
    // Return the region for Claude 3.5 Sonnet, or fallback
    return process.env.VERTEX_REGION_CLAUDE_3_5_SONNET || KL();
  }
  if (modelName?.startsWith("claude-3-7-sonnet")) {
    // Return the region for Claude 3.7 Sonnet, or fallback
    return process.env.VERTEX_REGION_CLAUDE_3_7_SONNET || KL();
  }
  if (modelName?.startsWith("claude-opus-4")) {
    // Return the region for Claude 4.0 Opus, or fallback
    return process.env.VERTEX_REGION_CLAUDE_4_0_OPUS || KL();
  }
  if (modelName?.startsWith("claude-sonnet-4")) {
    // Return the region for Claude 4.0 Sonnet, or fallback
    return process.env.VERTEX_REGION_CLAUDE_4_0_SONNET || KL();
  }
  // Fallback if no known model prefix matches
  return KL();
}

module.exports = getClaudeVertexRegion;
