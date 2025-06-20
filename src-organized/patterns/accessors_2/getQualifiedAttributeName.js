/**
 * Returns the qualified name of an attribute node, including namespace prefixes if applicable.
 *
 * @param {Attr} attributeNode - The attribute node whose qualified name is to be determined.
 * @returns {string} The qualified attribute name, possibly prefixed (e.g., 'xml:lang', 'xlink:href', 'xmlns', 'xmlns:foo').
 */
function getQualifiedAttributeName(attributeNode) {
  // Extract the namespace URI from the attribute node
  const namespaceURI = attributeNode.namespaceURI;

  // If there is no namespace, return the local name directly
  if (!namespaceURI) {
    return attributeNode.localName;
  }

  // Handle XML namespace
  if (namespaceURI === Ak.XML) {
    return `xml:${attributeNode.localName}`;
  }

  // Handle XLINK namespace
  if (namespaceURI === Ak.XLINK) {
    return `xlink:${attributeNode.localName}`;
  }

  // Handle XMLNS namespace
  if (namespaceURI === Ak.XMLNS) {
    // If the local name is exactly 'xmlns', return 'xmlns' (no colon)
    if (attributeNode.localName === "xmlns") {
      return "xmlns";
    } else {
      // Otherwise, return 'xmlns:localName'
      return `xmlns:${attributeNode.localName}`;
    }
  }

  // For any other namespace, return the full attribute name
  return attributeNode.name;
}

module.exports = getQualifiedAttributeName;