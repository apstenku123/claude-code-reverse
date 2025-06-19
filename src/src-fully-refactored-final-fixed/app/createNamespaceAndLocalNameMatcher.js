/**
 * Creates a predicate function that checks if a given DOM node matches the specified namespace URI and local name.
 *
 * @param {string} expectedNamespaceURI - The namespace URI to match against the node'createInteractionAccessor namespaceURI property.
 * @param {string} expectedLocalName - The local name to match against the node'createInteractionAccessor localName property.
 * @returns {function(Node): boolean} Predicate function that returns true if the node matches both the namespace URI and local name.
 */
function createNamespaceAndLocalNameMatcher(expectedNamespaceURI, expectedLocalName) {
  return function (node) {
    // Check if the node'createInteractionAccessor namespaceURI and localName match the expected values
    return node.namespaceURI === expectedNamespaceURI && node.localName === expectedLocalName;
  };
}

module.exports = createNamespaceAndLocalNameMatcher;