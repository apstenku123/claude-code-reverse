/**
 * Returns the appropriate Vertex region environment variable for a given Claude model name.
 * If the environment variable is not set, falls back to the KL() function.
 *
 * @param {string} modelName - The name of the Claude model to look up.
 * @returns {string} The Vertex region for the specified Claude model, or the fallback value from KL().
 */
function getVertexRegionForClaudeModel(modelName) {
  // Check if the model name starts with known Claude model prefixes and return the corresponding region
  if (modelName?.startsWith("claude-3-5-haiku")) {
    return process.env.VERTEX_REGION_CLAUDE_3_5_HAIKU || KL();
  }
  if (modelName?.startsWith("claude-3-5-sonnet")) {
    return process.env.VERTEX_REGION_CLAUDE_3_5_SONNET || KL();
  }
  if (modelName?.startsWith("claude-3-7-sonnet")) {
    return process.env.VERTEX_REGION_CLAUDE_3_7_SONNET || KL();
  }
  if (modelName?.startsWith("claude-opus-4")) {
    return process.env.VERTEX_REGION_CLAUDE_4_0_OPUS || KL();
  }
  if (modelName?.startsWith("claude-sonnet-4")) {
    return process.env.VERTEX_REGION_CLAUDE_4_0_SONNET || KL();
  }
  // If no known model prefix matches, return the fallback value
  return KL();
}

module.exports = getVertexRegionForClaudeModel;