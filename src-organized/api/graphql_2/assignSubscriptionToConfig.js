/**
 * Assigns a subscription object to a configuration array, optionally at a specific index, and updates the subscription'createInteractionAccessor owner element and related document mappings if a source observable is provided.
 *
 * @param {Object|null} sourceObservable - The source observable or owner element for the subscription. If provided, the subscription'createInteractionAccessor ownerElement is set and document mappings are updated.
 * @param {Array} configArray - The array to which the subscription will be assigned. Represents a configuration or collection of subscriptions.
 * @param {Object} subscription - The subscription object to assign and update.
 * @param {string|number|null} namespaceKey - Optional. The key/index at which to assign the subscription in the config array. If not provided, the subscription is appended.
 * @returns {void}
 */
function assignSubscriptionToConfig(sourceObservable, configArray, subscription, namespaceKey) {
  // If a namespaceKey is provided, assign the subscription at that key in the config array
  if (namespaceKey) {
    configArray[getNamespaceIndex(configArray, namespaceKey)] = subscription;
  } else {
    // Otherwise, append the subscription to the end of the config array
    configArray[configArray.length++] = subscription;
  }

  // If a sourceObservable is provided, update the subscription'createInteractionAccessor owner and document mappings
  if (sourceObservable) {
    subscription.ownerElement = sourceObservable;
    const ownerDocument = sourceObservable.ownerDocument;
    if (ownerDocument) {
      // If a namespaceKey is provided, update the namespace mapping in the document
      if (namespaceKey) {
        updateNamespaceMapping(ownerDocument, sourceObservable, namespaceKey);
      }
      // Always update the document'createInteractionAccessor subscription mapping
      updateDocumentSubscription(ownerDocument, sourceObservable, subscription);
    }
  }
}

// Export the function for use in other modules
module.exports = assignSubscriptionToConfig;
