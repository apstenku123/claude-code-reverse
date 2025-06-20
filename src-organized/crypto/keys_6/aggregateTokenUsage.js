/**
 * Aggregates token usage statistics from two token usage objects.
 *
 * This function takes two objects representing token usage statistics and returns a new object
 * where each property is the sum of the corresponding properties from the input objects.
 *
 * @param {Object} firstTokenUsage - The first token usage statistics object.
 * @param {number} firstTokenUsage.inputTokens - Number of input tokens.
 * @param {number} firstTokenUsage.outputTokens - Number of output tokens.
 * @param {number} firstTokenUsage.promptCacheWriteTokens - Number of prompt cache write tokens.
 * @param {number} firstTokenUsage.promptCacheReadTokens - Number of prompt cache read tokens.
 * @param {Object} secondTokenUsage - The second token usage statistics object.
 * @param {number} secondTokenUsage.inputTokens - Number of input tokens.
 * @param {number} secondTokenUsage.outputTokens - Number of output tokens.
 * @param {number} secondTokenUsage.promptCacheWriteTokens - Number of prompt cache write tokens.
 * @param {number} secondTokenUsage.promptCacheReadTokens - Number of prompt cache read tokens.
 * @returns {Object} An object containing the aggregated token usage statistics.
 */
function aggregateTokenUsage(firstTokenUsage, secondTokenUsage) {
  return {
    // Sum input tokens from both usage objects
    inputTokens: firstTokenUsage.inputTokens + secondTokenUsage.inputTokens,
    // Sum output tokens from both usage objects
    outputTokens: firstTokenUsage.outputTokens + secondTokenUsage.outputTokens,
    // Sum prompt cache write tokens from both usage objects
    promptCacheWriteTokens: firstTokenUsage.promptCacheWriteTokens + secondTokenUsage.promptCacheWriteTokens,
    // Sum prompt cache read tokens from both usage objects
    promptCacheReadTokens: firstTokenUsage.promptCacheReadTokens + secondTokenUsage.promptCacheReadTokens
  };
}

module.exports = aggregateTokenUsage;
