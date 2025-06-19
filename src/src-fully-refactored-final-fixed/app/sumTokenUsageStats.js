/**
 * Sums the token usage statistics from two token usage objects.
 *
 * @param {Object} firstTokenStats - The first token usage statistics object.
 * @param {number} firstTokenStats.inputTokens - Number of input tokens in the first object.
 * @param {number} firstTokenStats.outputTokens - Number of output tokens in the first object.
 * @param {number} firstTokenStats.promptCacheWriteTokens - Number of prompt cache write tokens in the first object.
 * @param {number} firstTokenStats.promptCacheReadTokens - Number of prompt cache read tokens in the first object.
 * @param {Object} secondTokenStats - The second token usage statistics object.
 * @param {number} secondTokenStats.inputTokens - Number of input tokens in the second object.
 * @param {number} secondTokenStats.outputTokens - Number of output tokens in the second object.
 * @param {number} secondTokenStats.promptCacheWriteTokens - Number of prompt cache write tokens in the second object.
 * @param {number} secondTokenStats.promptCacheReadTokens - Number of prompt cache read tokens in the second object.
 * @returns {Object} An object containing the summed token usage statistics.
 */
function sumTokenUsageStats(firstTokenStats, secondTokenStats) {
  return {
    // Sum input tokens from both statistics objects
    inputTokens: firstTokenStats.inputTokens + secondTokenStats.inputTokens,
    // Sum output tokens from both statistics objects
    outputTokens: firstTokenStats.outputTokens + secondTokenStats.outputTokens,
    // Sum prompt cache write tokens from both statistics objects
    promptCacheWriteTokens: firstTokenStats.promptCacheWriteTokens + secondTokenStats.promptCacheWriteTokens,
    // Sum prompt cache read tokens from both statistics objects
    promptCacheReadTokens: firstTokenStats.promptCacheReadTokens + secondTokenStats.promptCacheReadTokens
  };
}

module.exports = sumTokenUsageStats;
