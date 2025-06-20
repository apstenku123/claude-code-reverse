/**
 * Determines if a DOM element matches a given tag name or if its mapped value exists in a namespace mapping.
 *
 * If the second argument is a string, checks if the element'createInteractionAccessor namespace is HTML and its localName matches the string.
 * If the second argument is an object, attempts to retrieve a mapping for the element'createInteractionAccessor namespaceURI and localName.
 *
 * @param {Object} element - The DOM element descriptor with 'namespaceURI' and 'localName' properties.
 * @param {string|Object} tagNameOrNamespaceMap - a tag name string or a mapping object of namespaceURI to localName mappings.
 * @returns {boolean|any} Returns true if the element matches the tag name in the HTML namespace, or the mapped value if found; otherwise, false or undefined.
 */
function isMatchingElementOrMappedValue(element, tagNameOrNamespaceMap) {
  // If tagNameOrNamespaceMap is a string, check for HTML namespace and matching localName
  if (typeof tagNameOrNamespaceMap === "string") {
    return element.namespaceURI === y9.HTML && element.localName === tagNameOrNamespaceMap;
  }
  // Otherwise, treat tagNameOrNamespaceMap as a mapping object
  const namespaceMapping = tagNameOrNamespaceMap[element.namespaceURI];
  // Return the mapped value for the localName, if isBlobOrFileLikeObject exists
  return namespaceMapping && namespaceMapping[element.localName];
}

module.exports = isMatchingElementOrMappedValue;