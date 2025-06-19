/**
 * Calculates the total cost based on input/output tokens and cache token usage.
 *
 * @param {Object} tokenRates - An object specifying the cost per million tokens for each token type.
 * @param {number} tokenRates.inputTokens - Cost per million input tokens.
 * @param {number} tokenRates.outputTokens - Cost per million output tokens.
 * @param {number} tokenRates.promptCacheReadTokens - Cost per million prompt cache read tokens.
 * @param {number} tokenRates.promptCacheWriteTokens - Cost per million prompt cache write tokens.
 * @param {Object} tokenUsage - An object specifying the number of tokens used for each type.
 * @param {number} tokenUsage.input_tokens - Number of input tokens used.
 * @param {number} tokenUsage.output_tokens - Number of output tokens used.
 * @param {number} [tokenUsage.cache_read_input_tokens] - Number of cache read input tokens used (optional).
 * @param {number} [tokenUsage.cache_creation_input_tokens] - Number of cache creation input tokens used (optional).
 * @returns {number} The total calculated cost based on the provided token usage and rates.
 */
function calculateTokenCost(tokenRates, tokenUsage) {
  // Calculate cost for input tokens
  const inputTokenCost = (tokenUsage.input_tokens / 1e6) * tokenRates.inputTokens;

  // Calculate cost for output tokens
  const outputTokenCost = (tokenUsage.output_tokens / 1e6) * tokenRates.outputTokens;

  // Calculate cost for cache read input tokens (default to 0 if undefined)
  const cacheReadTokenCost = ((tokenUsage.cache_read_input_tokens ?? 0) / 1e6) * tokenRates.promptCacheReadTokens;

  // Calculate cost for cache creation input tokens (default to 0 if undefined)
  const cacheWriteTokenCost = ((tokenUsage.cache_creation_input_tokens ?? 0) / 1e6) * tokenRates.promptCacheWriteTokens;

  // Sum all costs to get the total
  return inputTokenCost + outputTokenCost + cacheReadTokenCost + cacheWriteTokenCost;
}

module.exports = calculateTokenCost;