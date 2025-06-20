/**
 * Calculates the total number of input tokens across all model tokens in the N9.modelTokens object.
 *
 * @returns {number} The sum of all inputTokens from each model token.
 */
function getTotalInputTokens() {
  // Initialize the total count of input tokens
  let totalInputTokens = 0;

  // Iterate over each model token object in N9.modelTokens
  for (const modelToken of Object.values(N9.modelTokens)) {
    // Add the inputTokens property of each model token to the total
    totalInputTokens += modelToken.inputTokens;
  }

  // Return the total input tokens
  return totalInputTokens;
}

module.exports = getTotalInputTokens;