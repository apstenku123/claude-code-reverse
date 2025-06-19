/**
 * Removes the XMLNS namespace mapping from the provided namespace map if applicable.
 *
 * If the subscription'createInteractionAccessor namespace URI matches the XMLNS namespace, this function deletes the
 * corresponding entry from the namespace map in the config object. It also increments the
 * internal change counter on the source observable if isBlobOrFileLikeObject exists.
 *
 * @param {Object} sourceObservable - The observable object whose internal counter is incremented if present.
 * @param {Object} config - The configuration object containing the namespace map (_nsMap).
 * @param {Object} subscription - The subscription object containing namespaceURI, prefix, and localName.
 * @param {Object} H11 - The constants object containing the XMLNS namespace URI.
 * @returns {void}
 */
function removeXmlnsNamespaceMapping(sourceObservable, config, subscription, H11) {
  // Increment the internal change counter if the source observable exists
  if (sourceObservable) {
    sourceObservable._inc++;
  }

  const namespaceURI = subscription.namespaceURI;

  // If the namespace URI matches XMLNS, remove the mapping from the namespace map
  if (namespaceURI === H11.XMLNS) {
    // If a prefix exists, use localName as the key; otherwise, use an empty string
    const nsMapKey = subscription.prefix ? subscription.localName : "";
    delete config._nsMap[nsMapKey];
  }
}

module.exports = removeXmlnsNamespaceMapping;