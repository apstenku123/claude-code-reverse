/**
 * Determines the subscription level for a given source observable and tracks usage if applicable.
 *
 * If the source observable is marked as a meta entry, returns 0 immediately. Otherwise, processes the
 * observable'createInteractionAccessor configuration, determines the subscription level, and logs the usage if the level is above 0.
 *
 * @param {Object} sourceObservable - The observable object to process.
 * @param {boolean} sourceObservable.isMeta - Indicates if this is a meta entry.
 * @returns {number} The subscription level for the given observable.
 */
function getSubscriptionLevelAndTrackUsage(sourceObservable) {
  // If the observable is a meta entry, return 0 (no subscription level)
  if (sourceObservable.isMeta) return 0;

  // Get the configuration string for the observable and convert to lowercase
  const config = extractMessageContent(sourceObservable).toLowerCase();

  // Determine the subscription level for the config
  const subscriptionLevel = getSubscriptionLevel(config);

  // If the subscription level is above 0, log the usage
  if (subscriptionLevel > 0) {
    logTelemetryEventIfEnabled("tengu_thinking", {
      provider: xU(),
      tokenCount: subscriptionLevel
    });
  }

  // Return the determined subscription level
  return subscriptionLevel;
}

module.exports = getSubscriptionLevelAndTrackUsage;