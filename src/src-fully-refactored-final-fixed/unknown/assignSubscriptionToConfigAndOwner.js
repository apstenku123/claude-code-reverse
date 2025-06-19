/**
 * Associates a subscription with a configuration object, optionally at a specific index, and sets its owner element.
 * If a source observable is provided, updates the subscription'createInteractionAccessor ownerElement and notifies the owner document.
 *
 * @param {Object|null} sourceObservable - The source observable or owner element for the subscription. If provided, the subscription'createInteractionAccessor ownerElement is set to this value.
 * @param {Array|Object} config - The configuration object or array to which the subscription will be added.
 * @param {Object} subscription - The subscription object to assign and update.
 * @param {string|number|null} [namespaceKey] - Optional key or index for where to assign the subscription in the config. If not provided, the subscription is appended.
 * @returns {void}
 */
function assignSubscriptionToConfigAndOwner(sourceObservable, config, subscription, namespaceKey) {
  if (namespaceKey) {
    // Assign the subscription at a specific key/index in the config
    config[getNamespaceIndex(config, namespaceKey)] = subscription;
  } else {
    // Append the subscription to the end of the config (assumed to be an array)
    config[config.length++] = subscription;
  }

  if (sourceObservable) {
    // Set the ownerElement property on the subscription
    subscription.ownerElement = sourceObservable;
    const ownerDocument = sourceObservable.ownerDocument;
    if (ownerDocument) {
      // If a namespaceKey is provided, remove the namespace mapping if necessary
      if (namespaceKey) {
        removeNamespaceMappingIfXmlns(ownerDocument, sourceObservable, namespaceKey);
      }
      // Notify the owner document of the new subscription
      notifyOwnerDocument(ownerDocument, sourceObservable, subscription);
    }
  }
}

// External dependencies (assumed to be imported elsewhere):
// - getNamespaceIndex (was findLastIndexOfElement)
// - removeNamespaceMappingIfXmlns (was updateNamespaceMapping)
// - notifyOwnerDocument (was incrementNamespaceMapIfXmlns)

module.exports = assignSubscriptionToConfigAndOwner;