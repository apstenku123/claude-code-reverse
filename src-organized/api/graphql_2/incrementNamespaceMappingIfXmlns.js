/**
 * Increments the internal counter of the source object if isBlobOrFileLikeObject exists, and updates the namespace mapping
 * in the config object if the subscription'createInteractionAccessor namespace URI matches the XMLNS namespace.
 *
 * @param {Object} sourceObservable - The source object which may have an internal increment counter (_inc).
 * @param {Object} config - The configuration object containing a namespace mapping (_nsMap).
 * @param {Object} subscription - The subscription object containing namespaceURI, prefix, localName, and value.
 * @returns {void}
 */
function incrementNamespaceMappingIfXmlns(sourceObservable, config, subscription) {
  // If the sourceObservable exists, increment its internal counter
  if (sourceObservable) {
    sourceObservable._inc++;
  }

  // Extract the namespace URI from the subscription
  const namespaceURI = subscription.namespaceURI;

  // If the namespace URI matches the XMLNS constant, update the namespace mapping
  if (namespaceURI === H11.XMLNS) {
    // Use the localName if a prefix exists, otherwise use an empty string as the key
    const nsMapKey = subscription.prefix ? subscription.localName : "";
    config._nsMap[nsMapKey] = subscription.value;
  }
}

module.exports = incrementNamespaceMappingIfXmlns;