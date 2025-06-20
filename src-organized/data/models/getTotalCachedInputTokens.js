/**
 * Calculates the total number of cached input tokens from all model tokens.
 *
 * Iterates over all entries in N9.modelTokens and sums their 'cacheReadInputTokens' property.
 *
 * @returns {number} The total count of cached input tokens across all model tokens.
 */
function getTotalCachedInputTokens() {
  let totalCachedInputTokens = 0;
  // Iterate over all model tokens and sum their cacheReadInputTokens property
  for (const modelToken of Object.values(N9.modelTokens)) {
    totalCachedInputTokens += modelToken.cacheReadInputTokens;
  }
  return totalCachedInputTokens;
}

module.exports = getTotalCachedInputTokens;