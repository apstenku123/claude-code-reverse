/**
 * Processes an element'createInteractionAccessor attributes and manages XML namespace mappings, then notifies handlers for element start/end.
 *
 * @param {Object} element - The element node to process. Must have tagName, length, and array-like attribute entries.
 * @param {Object} handler - Handler object with startElement, endElement, startPrefixMapping, endPrefixMapping methods.
 * @param {Object} namespaceMap - Current mapping of namespace prefixes to URIs (will be updated).
 * @returns {boolean|undefined} Returns true if the element is not closed (processing continues), otherwise undefined.
 */
function processElementWithNamespaces(element, handler, namespaceMap) {
  const tagName = element.tagName;
  let localNamespaceMap = null;
  let attributeCount = element.length;

  // First pass: process attributes for namespace declarations
  while (attributeCount--) {
    const attribute = element[attributeCount];
    const qualifiedName = attribute.qName;
    const attributeValue = attribute.value;
    const colonIndex = qualifiedName.indexOf(":");
    let prefix, localName, declaredPrefix;

    if (colonIndex > 0) {
      // Attribute has a prefix (e.g., xmlns:foo)
      prefix = attribute.prefix = qualifiedName.slice(0, colonIndex);
      localName = qualifiedName.slice(colonIndex + 1);
      declaredPrefix = (prefix === "xmlns") && localName;
    } else {
      // Attribute has no prefix (e.g., xmlns)
      localName = qualifiedName;
      prefix = null;
      declaredPrefix = (qualifiedName === "xmlns") && "";
    }
    attribute.localName = localName;

    // If this is a namespace declaration (xmlns or xmlns:prefix)
    if (declaredPrefix !== false) {
      if (localNamespaceMap == null) {
        localNamespaceMap = {};
        copyOwnProperties(namespaceMap, namespaceMap = {}); // Clone the namespace map (side effect)
      }
      namespaceMap[declaredPrefix] = localNamespaceMap[declaredPrefix] = attributeValue;
      attribute.uri = M11.XMLNS;
      handler.startPrefixMapping(declaredPrefix, attributeValue);
    }
  }

  // Second pass: assign namespace URIs to attributes with prefixes
  attributeCount = element.length;
  while (attributeCount--) {
    const attribute = element[attributeCount];
    const prefix = attribute.prefix;
    if (prefix) {
      if (prefix === "xml") {
        attribute.uri = M11.XML;
      }
      if (prefix !== "xmlns") {
        attribute.uri = namespaceMap[prefix || ""];
      }
    }
  }

  // Process the element'createInteractionAccessor own tag name for prefix/localName/uri
  const tagColonIndex = tagName.indexOf(":");
  let elementPrefix, elementLocalName;
  if (tagColonIndex > 0) {
    elementPrefix = element.prefix = tagName.slice(0, tagColonIndex);
    elementLocalName = element.localName = tagName.slice(tagColonIndex + 1);
  } else {
    elementPrefix = null;
    elementLocalName = element.localName = tagName;
  }
  const elementUri = element.uri = namespaceMap[elementPrefix || ""];

  // Notify handler of element start
  handler.startElement(elementUri, elementLocalName, tagName, element);

  // If the element is closed, notify handler of element end and end prefix mappings
  if (element.closed) {
    handler.endElement(elementUri, elementLocalName, tagName);
    if (localNamespaceMap) {
      for (const prefix in localNamespaceMap) {
        if (Object.prototype.hasOwnProperty.call(localNamespaceMap, prefix)) {
          handler.endPrefixMapping(prefix);
        }
      }
    }
  } else {
    // If not closed, store current and local namespace maps for later
    element.currentNSMap = namespaceMap;
    element.localNSMap = localNamespaceMap;
    return true;
  }
}

module.exports = processElementWithNamespaces;