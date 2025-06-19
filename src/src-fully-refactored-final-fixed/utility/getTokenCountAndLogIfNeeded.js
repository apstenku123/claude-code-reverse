/**
 * Calculates the token count for a given input object, logs the event if applicable, and returns the token count.
 *
 * @param {Object} inputObject - The object to process. Should have an 'isMeta' property.
 * @returns {number} The calculated token count, or 0 if the input is meta.
 */
function getTokenCountAndLogIfNeeded(inputObject) {
  // If the input is marked as meta, return 0 immediately
  if (inputObject.isMeta) {
    return 0;
  }

  // Convert the input to a string representation and normalize to lowercase
  const normalizedInput = extractMessageContent(inputObject).toLowerCase();

  // Calculate the token count using the external getSubscriptionLevel function
  const tokenCount = getSubscriptionLevel(normalizedInput);

  // If there are tokens, log the event with provider info and token count
  if (tokenCount > 0) {
    logTelemetryEventIfEnabled("tengu_thinking", {
      provider: xU(),
      tokenCount: tokenCount
    });
  }

  // Return the calculated token count
  return tokenCount;
}

module.exports = getTokenCountAndLogIfNeeded;