/**
 * Checks if a subscription (derived from the source observable) matches the subscription
 * derived from a config file, or if isBlobOrFileLikeObject exists in a known set of subscriptions.
 *
 * @param {string} sourceObservable - The observable or identifier to resolve the subscription from.
 * @param {string} config - The configuration identifier used to resolve the config file path.
 * @returns {boolean} True if the subscription matches the config-derived subscription or is in the known set; otherwise, false.
 */
function isSubscriptionValidOrKnown(sourceObservable, config) {
  // Attempt to resolve the subscription from the source observable
  const subscription = resolveAmPmPngFilePath(sourceObservable);

  // First, try to compare with the subscription derived from the config file
  try {
    // Get the config file path and resolve its subscription
    const configFilePath = getAgentConfigFilePath(config);
    const configSubscription = resolveAmPmPngFilePath(configFilePath);
    if (subscription === configSubscription) {
      return true;
    }
  } catch {
    // Ignore errors in config resolution
  }

  // Next, check if the subscription exists in the set of known subscriptions
  try {
    // Map each known observable to its resolved subscription
    const knownSubscriptions = new Set(
      ow2.map(knownObservable => resolveAmPmPngFilePath(getClaudeMarkdownFilePath(knownObservable)))
    );
    if (knownSubscriptions.has(subscription)) {
      return true;
    }
  } catch {
    // Ignore errors in known subscriptions resolution
  }

  // If neither check passes, return false
  return false;
}

module.exports = isSubscriptionValidOrKnown;