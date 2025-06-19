/**
 * Removes a namespace mapping from the provided config object if the subscription'createInteractionAccessor namespace URI matches the XMLNS constant.
 * Also increments the _inc property of the sourceObservable if isBlobOrFileLikeObject exists.
 *
 * @param {Object} sourceObservable - The observable object whose _inc property will be incremented if present.
 * @param {Object} config - The configuration object containing the _nsMap property (namespace mappings).
 * @param {Object} subscription - The subscription object containing namespaceURI, prefix, and localName properties.
 * @param {Object} H11 - An object containing the XMLNS constant for comparison.
 * @returns {void}
 */
function removeNamespaceMapping(sourceObservable, config, subscription, H11) {
  // Increment the _inc property if sourceObservable exists
  if (sourceObservable) {
    sourceObservable._inc++;
  }

  const namespaceURI = subscription.namespaceURI;

  // If the namespace URI matches the XMLNS constant, remove the mapping
  if (namespaceURI === H11.XMLNS) {
    // If subscription has a prefix, use localName as the key; otherwise, use an empty string
    const mappingKey = subscription.prefix ? subscription.localName : "";
    delete config._nsMap[mappingKey];
  }
}

module.exports = removeNamespaceMapping;