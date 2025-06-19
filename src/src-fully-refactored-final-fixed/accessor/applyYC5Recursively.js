/**
 * Recursively applies the removeElementNodeIdReference operation to a DOM node and all of its descendants.
 *
 * @param {Node} domNode - The root DOM node to start applying removeElementNodeIdReference from.
 * @returns {void}
 */
function applyYC5Recursively(domNode) {
  // Apply removeElementNodeIdReference operation to the current node
  removeElementNodeIdReference(domNode);

  // Recursively apply removeElementNodeIdReference to each child node
  for (let childNode = domNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
    applyYC5Recursively(childNode);
  }
}

module.exports = applyYC5Recursively;