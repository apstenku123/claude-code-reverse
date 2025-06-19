/**
 * Recursively traverses a DOM tree starting from the given node, processing each node using the registerDomNode function.
 * For each element node, the function will recursively process all of its child nodes.
 *
 * @param {Node} domNode - The DOM node to start traversal from.
 * @returns {void}
 */
function traverseAndProcessDomTree(domNode) {
  // Process the current node with the external registerDomNode function
  registerDomNode(domNode);

  // If the current node is an element node, recursively process its children
  if (domNode.nodeType === hZ.ELEMENT_NODE) {
    for (let childNode = domNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
      traverseAndProcessDomTree(childNode);
    }
  }
}

module.exports = traverseAndProcessDomTree;