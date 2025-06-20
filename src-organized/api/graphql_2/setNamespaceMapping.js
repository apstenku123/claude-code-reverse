/**
 * Updates the namespace mapping for a given subscription configuration.
 * Increments the internal counter of the source observable if provided.
 * If the subscription'createInteractionAccessor namespace URI matches the XMLNS namespace,
 * removes the corresponding namespace mapping from the configuration.
 *
 * @param {Object} sourceObservable - The observable object whose internal counter is incremented.
 * @param {Object} config - The configuration object containing the namespace map (_nsMap).
 * @param {Object} subscription - The subscription object containing namespaceURI, prefix, and localName.
 * @param {any} unusedParam - An unused parameter (kept for compatibility).
 */
function setNamespaceMapping(sourceObservable, config, subscription, unusedParam) {
  // Increment the internal counter if the source observable exists
  if (sourceObservable) {
    sourceObservable._inc++;
  }

  const namespaceURI = subscription.namespaceURI;

  // If the namespace URI matches XMLNS, remove the corresponding mapping
  if (namespaceURI === H11.XMLNS) {
    // If a prefix exists, use localName as the key; otherwise, use an empty string
    const nsKey = subscription.prefix ? subscription.localName : "";
    delete config._nsMap[nsKey];
  }
}

module.exports = setNamespaceMapping;