/**
 * Recursively traverses a DOM node and its descendants, applying the removeElementNodeIdReference function to each node.
 *
 * @param {Node} domNode - The root DOM node to start traversal from.
 * @returns {void} This function does not return a value.
 */
function traverseDomAndApplyYC5(domNode) {
  // Apply the removeElementNodeIdReference function to the current node
  removeElementNodeIdReference(domNode);

  // Recursively traverse and apply removeElementNodeIdReference to all child nodes
  for (let childNode = domNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
    traverseDomAndApplyYC5(childNode);
  }
}

module.exports = traverseDomAndApplyYC5;