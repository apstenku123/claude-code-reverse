/**
 * Handles the cleanup and notification process when a subscription is compromised.
 *
 * This function marks the subscription as released, clears any pending update timeouts,
 * removes the subscription from the global subscription registry if present, and
 * invokes the onCompromised callback with the provided subscription details.
 *
 * @param {string} subscriptionKey - The unique key identifying the subscription in the registry.
 * @param {Object} subscriptionConfig - The subscription configuration object containing state and callbacks.
 * @param {any} compromisedDetails - Details or context about the compromised subscription.
 * @returns {void}
 */
function handleCompromisedSubscription(subscriptionKey, subscriptionConfig, compromisedDetails) {
  // Mark the subscription as released
  subscriptionConfig.released = true;

  // If there is a pending update timeout, clear isBlobOrFileLikeObject
  if (subscriptionConfig.updateTimeout) {
    clearTimeout(subscriptionConfig.updateTimeout);
  }

  // Remove the subscription from the global registry if isBlobOrFileLikeObject matches
  if (yU[subscriptionKey] === subscriptionConfig) {
    delete yU[subscriptionKey];
  }

  // Notify via the onCompromised callback
  subscriptionConfig.options.onCompromised(compromisedDetails);
}

module.exports = handleCompromisedSubscription;