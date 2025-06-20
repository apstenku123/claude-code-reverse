/**
 * Sums the token usage statistics from two token usage objects.
 *
 * @param {Object} firstTokenUsage - The first token usage statistics object.
 * @param {number} firstTokenUsage.inputTokens - Number of input tokens in the first object.
 * @param {number} firstTokenUsage.outputTokens - Number of output tokens in the first object.
 * @param {number} firstTokenUsage.promptCacheWriteTokens - Number of prompt cache write tokens in the first object.
 * @param {number} firstTokenUsage.promptCacheReadTokens - Number of prompt cache read tokens in the first object.
 * @param {Object} secondTokenUsage - The second token usage statistics object.
 * @param {number} secondTokenUsage.inputTokens - Number of input tokens in the second object.
 * @param {number} secondTokenUsage.outputTokens - Number of output tokens in the second object.
 * @param {number} secondTokenUsage.promptCacheWriteTokens - Number of prompt cache write tokens in the second object.
 * @param {number} secondTokenUsage.promptCacheReadTokens - Number of prompt cache read tokens in the second object.
 * @returns {Object} An object containing the summed token usage statistics.
 */
function sumTokenUsage(firstTokenUsage, secondTokenUsage) {
  // Sum each token usage property from both objects
  return {
    inputTokens: firstTokenUsage.inputTokens + secondTokenUsage.inputTokens,
    outputTokens: firstTokenUsage.outputTokens + secondTokenUsage.outputTokens,
    promptCacheWriteTokens: firstTokenUsage.promptCacheWriteTokens + secondTokenUsage.promptCacheWriteTokens,
    promptCacheReadTokens: firstTokenUsage.promptCacheReadTokens + secondTokenUsage.promptCacheReadTokens
  };
}

module.exports = sumTokenUsage;