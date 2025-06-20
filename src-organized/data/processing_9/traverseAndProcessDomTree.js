/**
 * Recursively traverses a DOM tree starting from the given node and processes each node using the removeElementNodeIdReference function.
 *
 * @param {Node} domNode - The root DOM node to start traversal from. Each node in the subtree will be processed.
 * @returns {void}
 */
function traverseAndProcessDomTree(domNode) {
  // Process the current DOM node
  removeElementNodeIdReference(domNode);

  // Recursively process all child nodes
  for (let childNode = domNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
    traverseAndProcessDomTree(childNode);
  }
}

module.exports = traverseAndProcessDomTree;