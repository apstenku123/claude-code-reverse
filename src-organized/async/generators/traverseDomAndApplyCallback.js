/**
 * Recursively traverses a DOM tree starting from the given node and applies the removeElementNodeIdReference callback to each node.
 *
 * @param {Node} rootNode - The root DOM node to start traversal from.
 * @returns {void}
 */
function traverseDomAndApplyCallback(rootNode) {
  // Apply the removeElementNodeIdReference callback to the current node
  removeElementNodeIdReference(rootNode);

  // Recursively traverse all child nodes
  for (let childNode = rootNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
    traverseDomAndApplyCallback(childNode);
  }
}

module.exports = traverseDomAndApplyCallback;