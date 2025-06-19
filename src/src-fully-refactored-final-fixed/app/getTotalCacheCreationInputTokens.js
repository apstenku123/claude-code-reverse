/**
 * Calculates the total number of cache creation input tokens across all model tokens.
 *
 * Iterates through all model tokens in the N9.modelTokens object and sums the value of
 * their 'cacheCreationInputTokens' property. Returns the total sum.
 *
 * @returns {number} The total count of cache creation input tokens for all model tokens.
 */
function getTotalCacheCreationInputTokens() {
  let totalInputTokens = 0;

  // Iterate over each model token object in N9.modelTokens
  for (const modelToken of Object.values(N9.modelTokens)) {
    // Add the cacheCreationInputTokens value from each model token to the total
    totalInputTokens += modelToken.cacheCreationInputTokens;
  }

  return totalInputTokens;
}

module.exports = getTotalCacheCreationInputTokens;