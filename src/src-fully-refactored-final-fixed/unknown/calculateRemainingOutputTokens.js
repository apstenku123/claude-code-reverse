/**
 * Calculates the remaining number of output tokens allowed based on the current input context.
 *
 * This function retrieves the current input context (such as a prompt or text input), determines the maximum number
 * of output tokens allowed for that context using environment configuration and keyword handling, and then subtracts
 * that value from the global maximum output token limit.
 *
 * @returns {number} The number of output tokens remaining that can be used for this context.
 */
function calculateRemainingOutputTokens() {
  // Retrieve the current input context (e.g., prompt text)
  const inputContext = getProcessedInteractionRoute();

  // Determine the maximum output tokens allowed for the current input context
  const maxOutputTokensForContext = getMaxOutputTokens(inputContext);

  // Calculate and return the remaining output tokens
  // 'tw2' is assumed to be a global constant representing the total allowed output tokens
  return tw2 - maxOutputTokensForContext;
}

module.exports = calculateRemainingOutputTokens;