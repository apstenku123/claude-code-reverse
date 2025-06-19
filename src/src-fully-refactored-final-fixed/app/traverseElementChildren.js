/**
 * Recursively traverses all child nodes of a given DOM element and applies a processing function to each node.
 *
 * @param {Node} domNode - The DOM node to start traversal from.
 * @returns {void}
 *
 * This function first processes the current node using registerDomNode, then, if the node is an element,
 * recursively processes all of its child nodes by calling traverseElementChildren on each child.
 */
function traverseElementChildren(domNode) {
  // Process the current node using the external registerDomNode function
  registerDomNode(domNode);

  // Check if the node is an element node before traversing its children
  if (domNode.nodeType === hZ.ELEMENT_NODE) {
    // Iterate through all child nodes
    for (let childNode = domNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
      // Recursively process each child node
      traverseElementChildren(childNode);
    }
  }
}

module.exports = traverseElementChildren;