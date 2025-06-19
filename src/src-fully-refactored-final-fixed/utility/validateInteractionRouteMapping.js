/**
 * Validates the mapping of user interaction entries to routes, enforcing size and token limits.
 * Throws descriptive errors if the mapping exceeds allowed limits.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to be mapped to routes.
 * @param {Object} routeConfig - Configuration object for the route mapping.
 * @param {Object} subscriptionContext - Context or options for the mapping subscription.
 * @throws {Error} If the mapping size or token count exceeds allowed limits.
 */
async function validateInteractionRouteMapping(interactionEntries, routeConfig, subscriptionContext) {
  // If the routeConfig is not already present and the number of entries exceeds the allowed limit, throw an error
  if (!cV1.has(routeConfig) && interactionEntries.length > lV1) {
    throw new Error(Fo1(interactionEntries.length));
  }

  // Calculate one fourth of the length of the interaction entries
  const quarterLength = getQuarterLength(interactionEntries);

  // If the quarter length exists and is greater than a quarter of the allowed token limit
  if (quarterLength && quarterLength > ye / 4) {
    // Await the token count for the current mapping
    const tokenCount = await sendUserMessage(interactionEntries, subscriptionContext);
    // If the token count exceeds the allowed token limit, throw an error with a descriptive message
    if (tokenCount && tokenCount > ye) {
      throw new Error(getFileContentExceedsTokenLimitMessage(tokenCount));
    }
  }
}

module.exports = validateInteractionRouteMapping;