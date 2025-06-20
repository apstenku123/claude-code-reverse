/**
 * Removes a subscription from a configuration array and updates the namespace mapping if necessary.
 *
 * @param {Object} sourceObservable - The source observable associated with the subscription. Used for ownerDocument and tagName references.
 * @param {Array} config - The array of subscriptions/configuration objects to remove from.
 * @param {Object} subscription - The subscription object to remove from the config array.
 * @throws {Error} Throws an error if the subscription is not found in the config array.
 */
function removeSubscriptionFromConfig(sourceObservable, config, subscription) {
  // Find the index of the subscription in the config array
  const subscriptionIndex = findLastIndexOfElement(config, subscription);

  if (subscriptionIndex >= 0) {
    // Remove the subscription from the config array by shifting elements left
    const lastIndex = config.length - 1;
    let currentIndex = subscriptionIndex;
    while (currentIndex < lastIndex) {
      config[currentIndex] = config[++currentIndex];
    }
    // Reduce the array length by one to remove the last (now duplicate) entry
    config.length = lastIndex;

    // If a sourceObservable is provided, update the namespace mapping
    if (sourceObservable) {
      const ownerDocument = sourceObservable.ownerDocument;
      if (ownerDocument) {
        updateNamespaceMapping(ownerDocument, sourceObservable, subscription);
        // Remove the reference to the owner element from the subscription
        subscription.ownerElement = null;
      }
    }
  } else {
    // Throw an error if the subscription is not found in the config array
    throw new yQ(jE2, new Error(sourceObservable.tagName + "@" + subscription));
  }
}

module.exports = removeSubscriptionFromConfig;