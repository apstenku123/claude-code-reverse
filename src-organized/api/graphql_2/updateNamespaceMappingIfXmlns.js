/**
 * Updates the namespace mapping on the provided config object if the subscription'createInteractionAccessor namespace URI is XMLNS.
 * Also increments the _inc property of the sourceObservable if isBlobOrFileLikeObject exists.
 *
 * @param {Object} sourceObservable - An object that may have an _inc property to increment (can be null/undefined).
 * @param {Object} config - The configuration object that contains a _nsMap property to update.
 * @param {Object} subscription - An object representing a namespace attribute, with namespaceURI, prefix, localName, and value properties.
 * @returns {void}
 */
function updateNamespaceMappingIfXmlns(sourceObservable, config, subscription) {
  // Increment the _inc property if sourceObservable exists
  if (sourceObservable) {
    sourceObservable._inc++;
  }

  const namespaceURI = subscription.namespaceURI;

  // If the namespace URI is XMLNS, update the namespace map on config
  if (namespaceURI === H11.XMLNS) {
    // Use the localName if prefix exists, otherwise use empty string as key
    const nsMapKey = subscription.prefix ? subscription.localName : "";
    config._nsMap[nsMapKey] = subscription.value;
  }
}

module.exports = updateNamespaceMappingIfXmlns;