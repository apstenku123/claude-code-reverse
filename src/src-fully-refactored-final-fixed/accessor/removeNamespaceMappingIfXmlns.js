/**
 * Removes a namespace mapping from the configuration object if the subscription'createInteractionAccessor namespace URI is XMLNS.
 * Also increments the internal counter of the source observable if isBlobOrFileLikeObject exists.
 *
 * @param {Object} sourceObservable - The observable object whose internal counter (_inc) is incremented if present.
 * @param {Object} config - The configuration object containing the _nsMap property where namespace mappings are stored.
 * @param {Object} subscription - The subscription object containing namespaceURI, prefix, and localName properties.
 * @param {Object} H11 - An object containing the XMLNS namespace URI as H11.XMLNS.
 * @returns {void}
 */
function removeNamespaceMappingIfXmlns(sourceObservable, config, subscription, H11) {
  // Increment the internal counter if the source observable exists
  if (sourceObservable) {
    sourceObservable._inc++;
  }

  const namespaceURI = subscription.namespaceURI;

  // If the namespace URI is XMLNS, remove the corresponding mapping from config._nsMap
  if (namespaceURI === H11.XMLNS) {
    // If a prefix exists, use localName as the key; otherwise, use an empty string
    const mappingKey = subscription.prefix ? subscription.localName : "";
    delete config._nsMap[mappingKey];
  }
}

module.exports = removeNamespaceMappingIfXmlns;