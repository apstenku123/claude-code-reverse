/**
 * Calculates the token count for a given input and sends a notification if the count is greater than zero.
 *
 * @param {Object} inputObject - The object to process. Should have an 'isMeta' property.
 * @returns {number} The number of tokens calculated for the input.
 */
function getTokenCountAndNotifyIfNeeded(inputObject) {
  // If the input is marked as meta, return 0 tokens immediately
  if (inputObject.isMeta) {
    return 0;
  }

  // Convert the input to a string representation and normalize case
  const normalizedInput = extractMessageContent(inputObject).toLowerCase();

  // Calculate the token count using the external function
  const tokenCount = getSubscriptionLevel(normalizedInput);

  // If there are any tokens, send a notification with provider and token count
  if (tokenCount > 0) {
    logTelemetryEventIfEnabled("tengu_thinking", {
      provider: xU(),
      tokenCount: tokenCount
    });
  }

  // Return the calculated token count
  return tokenCount;
}

module.exports = getTokenCountAndNotifyIfNeeded;