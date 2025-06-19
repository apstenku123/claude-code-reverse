/**
 * Returns the qualified name of a DOM node, including namespace prefixes if applicable.
 *
 * @param {Node} node - The DOM node whose qualified name is to be determined. The node is expected to have 'namespaceURI', 'localName', and 'name' properties.
 * @returns {string} The qualified name of the node, with the appropriate namespace prefix if required.
 */
function getQualifiedNameFromNode(node) {
  const namespaceURI = node.namespaceURI;
  // If there is no namespace, return the local name directly
  if (!namespaceURI) {
    return node.localName;
  }

  // Handle XML namespace
  if (namespaceURI === Ak.XML) {
    return `xml:${node.localName}`;
  }

  // Handle XLINK namespace
  if (namespaceURI === Ak.XLINK) {
    return `xlink:${node.localName}`;
  }

  // Handle XMLNS namespace
  if (namespaceURI === Ak.XMLNS) {
    // If the localName is 'xmlns', return 'xmlns' (no prefix)
    if (node.localName === "xmlns") {
      return "xmlns";
    } else {
      // Otherwise, prefix with 'xmlns:'
      return `xmlns:${node.localName}`;
    }
  }

  // For all other namespaces, return the node'createInteractionAccessor name property
  return node.name;
}

module.exports = getQualifiedNameFromNode;