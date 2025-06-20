/**
 * Processes an element'createInteractionAccessor attributes to handle XML namespaces, updates namespace mappings,
 * and notifies handler callbacks for prefix and element events. Used in XML parsing.
 *
 * @param {Object} element - The element node being processed. Should have tagName, attributes, etc.
 * @param {Object} handler - Handler object with startElement, endElement, startPrefixMapping, endPrefixMapping methods.
 * @param {Object} namespaceMapping - Current mapping of prefixes to namespace URIs (mutable).
 * @returns {boolean|undefined} Returns true if the element is not closed (open element), otherwise undefined.
 */
function processElementNamespacesAndNotifyHandlers(element, handler, namespaceMapping) {
  const tagName = element.tagName;
  let localNamespaceMap = null; // Will hold any new/overridden namespace declarations for this element
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

    // If this attribute is a namespace declaration
    if (declaredPrefix !== false) {
      if (localNamespaceMap == null) {
        localNamespaceMap = {};
        copyOwnProperties(namespaceMapping, namespaceMapping = {}); // Clone the namespace mapping for this element
      }
      namespaceMapping[declaredPrefix] = localNamespaceMap[declaredPrefix] = attributeValue;
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
        attribute.uri = namespaceMapping[prefix || ""];
      }
    }
  }

  // Process the element'createInteractionAccessor own tagName for prefix/localName and assign its namespace URI
  const tagColonIndex = tagName.indexOf(":");
  let elementPrefix, elementLocalName;
  if (tagColonIndex > 0) {
    elementPrefix = element.prefix = tagName.slice(0, tagColonIndex);
    elementLocalName = element.localName = tagName.slice(tagColonIndex + 1);
  } else {
    elementPrefix = null;
    elementLocalName = element.localName = tagName;
  }
  const elementNamespaceURI = element.uri = namespaceMapping[elementPrefix || ""];

  // Notify handler of startElement
  handler.startElement(elementNamespaceURI, elementLocalName, tagName, element);

  // If the element is self-closing, notify handler of endElement and endPrefixMapping
  if (element.closed) {
    handler.endElement(elementNamespaceURI, elementLocalName, tagName);
    if (localNamespaceMap) {
      for (const prefix in localNamespaceMap) {
        if (Object.prototype.hasOwnProperty.call(localNamespaceMap, prefix)) {
          handler.endPrefixMapping(prefix);
        }
      }
    }
  } else {
    // Otherwise, save the current and local namespace maps for later
    element.currentNSMap = namespaceMapping;
    element.localNSMap = localNamespaceMap;
    return true;
  }
}

module.exports = processElementNamespacesAndNotifyHandlers;