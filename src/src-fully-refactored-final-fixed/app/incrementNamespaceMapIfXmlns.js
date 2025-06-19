/**
 * Increments the _inc property on the provided source object (if present),
 * and updates the namespace map of the config object if the subscription'createInteractionAccessor namespace URI matches XMLNS.
 *
 * @param {Object} sourceObject - The object whose _inc property will be incremented if isBlobOrFileLikeObject exists.
 * @param {Object} configObject - The object containing the _nsMap to update if conditions are met.
 * @param {Object} subscription - The object containing namespaceURI, prefix, localName, and value properties.
 * @returns {void}
 */
function incrementNamespaceMapIfXmlns(sourceObject, configObject, subscription) {
  // Increment the _inc property if sourceObject is defined
  if (sourceObject) {
    sourceObject._inc++;
  }

  // Extract the namespace URI from the subscription
  const namespaceUri = subscription.namespaceURI;

  // If the namespace URI matches XMLNS, update the configObject'createInteractionAccessor namespace map
  if (namespaceUri === H11.XMLNS) {
    // Use the localName if a prefix exists, otherwise use an empty string as the key
    const nsMapKey = subscription.prefix ? subscription.localName : "";
    configObject._nsMap[nsMapKey] = subscription.value;
  }
}

module.exports = incrementNamespaceMapIfXmlns;