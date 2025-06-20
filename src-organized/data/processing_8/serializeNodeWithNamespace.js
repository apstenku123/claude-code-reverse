/**
 * Serializes the current DOM node with namespace and prefix information.
 *
 * @param {any} nodeData - Data or configuration to be used during serialization.
 * @param {any} options - Additional options for serialization.
 * @returns {string} The serialized string representation of the node.
 */
function serializeNodeWithNamespace(nodeData, options) {
  // Initialize an array to accumulate serialization output
  const outputParts = [];

  // Determine the context node: if this is a document node, use its documentElement; otherwise, use this
  const contextNode = this.nodeType === 9 && this.documentElement ? this.documentElement : this;

  // Extract the prefix and namespace URI from the context node
  let nodePrefix = contextNode.prefix;
  const nodeNamespaceURI = contextNode.namespaceURI;

  // Will hold namespace declaration if needed
  let namespaceDeclarations;

  // If the node has a namespace URI but no prefix, attempt to look up the prefix
  if (nodeNamespaceURI && nodePrefix == null) {
    nodePrefix = contextNode.lookupPrefix(nodeNamespaceURI);
    // If still no prefix, create a namespace declaration with a null prefix
    if (nodePrefix == null) {
      namespaceDeclarations = [{
        namespace: nodeNamespaceURI,
        prefix: null
      }];
    }
  }

  // Call the serializeXmlNode function to perform the actual serialization logic
  // Passing: this node, output array, nodeData, options, and any namespace declarations
  serializeXmlNode(this, outputParts, nodeData, options, namespaceDeclarations);

  // Join and return the serialized output as a string
  return outputParts.join("");
}

module.exports = serializeNodeWithNamespace;