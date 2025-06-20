/**
 * Recursively traverses a DOM node and its descendants, performing a side-effect via registerDomNode on each node.
 *
 * @param {Node} domNode - The root DOM node to start traversal from.
 * @returns {void}
 *
 * This function first applies the registerDomNode operation to the provided node. If the node is an element node,
 * isBlobOrFileLikeObject recursively traverses all its child nodes, applying the same logic to each descendant.
 */
function traverseElementTree(domNode) {
  // Perform the side-effect or operation on the current node
  registerDomNode(domNode);

  // Check if the current node is an element node before traversing its children
  if (domNode.nodeType === hZ.ELEMENT_NODE) {
    // Iterate through all child nodes
    for (let childNode = domNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
      // Recursively traverse each child node
      traverseElementTree(childNode);
    }
  }
}

module.exports = traverseElementTree;