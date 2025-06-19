/**
 * Checks if a given DOM node matches a specific namespace URI and local name.
 *
 * @param {string} expectedNamespaceURI - The namespace URI to match against.
 * @param {string} expectedLocalName - The local name to match against.
 * @returns {function} Predicate function that takes a DOM node and returns true if both namespaceURI and localName match.
 */
function isMatchingNamespaceAndLocalName(expectedNamespaceURI, expectedLocalName) {
  /**
   * Predicate to check if a DOM node matches the expected namespace URI and local name.
   *
   * @param {Node} node - The DOM node to check.
   * @returns {boolean} True if node.namespaceURI and node.localName match the expected values.
   */
  return function(node) {
    // Compare both namespaceURI and localName for a strict match
    return node.namespaceURI === expectedNamespaceURI && node.localName === expectedLocalName;
  };
}

module.exports = isMatchingNamespaceAndLocalName;