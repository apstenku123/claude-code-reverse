/**
 * Determines if a given DOM element matches a tag name or configuration object.
 *
 * If the 'tagOrConfig' parameter is a string, the function checks if the element'createInteractionAccessor namespace is HTML
 * and its local name matches the string. If 'tagOrConfig' is an object, isBlobOrFileLikeObject attempts to retrieve a mapping
 * for the element'createInteractionAccessor namespace and then checks if the mapping contains a property for the element'createInteractionAccessor local name.
 *
 * @param {Object} elementInfo - An object representing a DOM element, with 'namespaceURI' and 'localName' properties.
 * @param {string|Object} tagOrConfig - Either a string representing a tag name or an object mapping namespaces to tag configurations.
 * @returns {boolean|any} Returns true if the element matches the tag name, or the value from the config object if found; otherwise, false or undefined.
 */
function isMatchingElementOrConfig(elementInfo, tagOrConfig) {
  // If tagOrConfig is a string, check if the element is an HTML element with the matching local name
  if (typeof tagOrConfig === "string") {
    return elementInfo.namespaceURI === y9.HTML && elementInfo.localName === tagOrConfig;
  }
  // Otherwise, treat tagOrConfig as a configuration object mapping namespaces to tag maps
  const namespaceMapping = tagOrConfig[elementInfo.namespaceURI];
  // Return the value for the element'createInteractionAccessor local name in the namespace mapping, if isBlobOrFileLikeObject exists
  return namespaceMapping && namespaceMapping[elementInfo.localName];
}

module.exports = isMatchingElementOrConfig;