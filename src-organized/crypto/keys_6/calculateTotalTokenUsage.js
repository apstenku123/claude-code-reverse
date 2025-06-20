/**
 * Calculates the total number of tokens used in a request, including input, output, and cache-related tokens.
 *
 * @param {Object} tokenStats - An object containing token usage statistics for a request.
 * @param {number} tokenStats.input_tokens - The number of input tokens used.
 * @param {number} [tokenStats.cache_creation_input_tokens=0] - The number of input tokens used for cache creation (optional).
 * @param {number} [tokenStats.cache_read_input_tokens=0] - The number of input tokens used for cache reads (optional).
 * @param {number} tokenStats.output_tokens - The number of output tokens generated.
 * @returns {number} The total number of tokens used for the request.
 */
function calculateTotalTokenUsage(tokenStats) {
  // Use nullish coalescing to default cache-related tokens to 0 if not present
  const cacheCreationTokens = tokenStats.cache_creation_input_tokens ?? 0;
  const cacheReadTokens = tokenStats.cache_read_input_tokens ?? 0;

  // Sum all relevant token counts
  const totalTokens = tokenStats.input_tokens + cacheCreationTokens + cacheReadTokens + tokenStats.output_tokens;
  return totalTokens;
}

module.exports = calculateTotalTokenUsage;