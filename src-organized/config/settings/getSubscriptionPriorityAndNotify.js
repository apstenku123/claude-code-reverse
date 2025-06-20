/**
 * Determines the priority level for a given subscription configuration and optionally notifies if the priority is above zero.
 *
 * @param {Object} subscriptionConfig - The subscription configuration object to evaluate.
 * @param {boolean} subscriptionConfig.isMeta - Indicates if the configuration is a meta configuration.
 * @returns {number} The priority level for the subscription (0 if meta or no priority).
 */
function getSubscriptionPriorityAndNotify(subscriptionConfig) {
  // If the configuration is a meta configuration, return 0 immediately
  if (subscriptionConfig.isMeta) {
    return 0;
  }

  // Convert the configuration to a string and normalize to lowercase
  const configString = extractMessageContent(subscriptionConfig).toLowerCase();

  // Determine the priority level for the subscription
  const priorityLevel = getSubscriptionLevel(configString);

  // If the priority level is above 0, send a notification
  if (priorityLevel > 0) {
    logTelemetryEventIfEnabled("tengu_thinking", {
      provider: xU(),
      tokenCount: priorityLevel
    });
  }

  // Return the determined priority level
  return priorityLevel;
}

module.exports = getSubscriptionPriorityAndNotify;