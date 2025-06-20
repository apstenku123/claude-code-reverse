/**
 * Determines the priority level for a given subscription and tracks usage if applicable.
 *
 * If the provided subscription object is marked as a meta subscription, returns 0 immediately.
 * Otherwise, processes the subscription name, determines its priority level, and logs the usage
 * if the priority level is greater than 0.
 *
 * @param {Object} subscription - The subscription object to evaluate.
 * @param {boolean} subscription.isMeta - Indicates if this is a meta subscription.
 * @returns {number} The priority level for the given subscription (0 if meta or not found).
 */
function getSubscriptionPriorityAndTrackUsage(subscription) {
  // Return 0 immediately if this is a meta subscription
  if (subscription.isMeta) return 0;

  // Normalize the subscription name to lowercase
  const subscriptionName = extractMessageContent(subscription).toLowerCase();

  // Determine the priority level for the subscription
  const priorityLevel = getSubscriptionLevel(subscriptionName);

  // If the priority level is greater than 0, log the usage for analytics/tracking
  if (priorityLevel > 0) {
    logTelemetryEventIfEnabled("tengu_thinking", {
      provider: xU(),
      tokenCount: priorityLevel
    });
  }

  // Return the determined priority level
  return priorityLevel;
}

module.exports = getSubscriptionPriorityAndTrackUsage;