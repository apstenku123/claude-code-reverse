/**
 * Updates the namespace mapping for a given subscription object.
 * Increments the internal counter of the source observable if present.
 * If the subscription'createInteractionAccessor namespace URI matches the XMLNS constant,
 * removes the corresponding namespace mapping from the config object.
 *
 * @param {Object} sourceObservable - The observable object whose internal counter may be incremented.
 * @param {Object} config - The configuration object containing the namespace mapping (_nsMap).
 * @param {Object} subscription - The subscription object containing namespace information (namespaceURI, prefix, localName).
 * @param {any} unusedParam - An unused parameter (kept for compatibility).
 */
function updateNamespaceMapping(sourceObservable, config, subscription, unusedParam) {
  // Increment the internal counter if sourceObservable exists
  if (sourceObservable) {
    sourceObservable._inc++;
  }

  const namespaceURI = subscription.namespaceURI;

  // If the namespace URI matches the XMLNS constant, remove the mapping
  if (namespaceURI === H11.XMLNS) {
    // If a prefix exists, use localName as the key; otherwise, use an empty string
    const nsKey = subscription.prefix ? subscription.localName : "";
    delete config._nsMap[nsKey];
  }
}

module.exports = updateNamespaceMapping;