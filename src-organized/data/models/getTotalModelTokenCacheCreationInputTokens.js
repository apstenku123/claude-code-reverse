/**
 * Calculates the total number of cache creation input tokens across all model tokens.
 *
 * Iterates over all model tokens in the N9.modelTokens object and sums their 'cacheCreationInputTokens' property.
 *
 * @returns {number} The total count of cache creation input tokens for all model tokens.
 */
function getTotalModelTokenCacheCreationInputTokens() {
  // Initialize the total token count to zero
  let totalCacheCreationInputTokens = 0;

  // Iterate over each model token object in N9.modelTokens
  for (const modelToken of Object.values(N9.modelTokens)) {
    // Add the cacheCreationInputTokens value from each model token to the total
    totalCacheCreationInputTokens += modelToken.cacheCreationInputTokens;
  }

  // Return the total count
  return totalCacheCreationInputTokens;
}

module.exports = getTotalModelTokenCacheCreationInputTokens;