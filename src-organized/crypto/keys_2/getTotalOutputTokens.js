/**
 * Calculates the total number of output tokens from all model tokens in the N9 object.
 *
 * Iterates over each entry in N9.modelTokens and sums their outputTokens property.
 *
 * @returns {number} The total count of output tokens from all model tokens.
 */
function getTotalOutputTokens() {
  // Initialize the total output token counter
  let totalOutputTokens = 0;

  // Iterate over each model token object and sum their outputTokens property
  for (const modelToken of Object.values(N9.modelTokens)) {
    totalOutputTokens += modelToken.outputTokens;
  }

  // Return the total output tokens
  return totalOutputTokens;
}

module.exports = getTotalOutputTokens;
