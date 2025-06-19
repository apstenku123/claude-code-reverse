/**
 * Recursively applies the removeElementNodeIdReference function to a DOM node and all of its descendants.
 *
 * @param {Node} domNode - The root DOM node to start applying removeElementNodeIdReference from.
 * @returns {void} This function does not return a value.
 */
function applyYC5RecursivelyToDOMTree(domNode) {
  // Apply removeElementNodeIdReference to the current DOM node
  removeElementNodeIdReference(domNode);

  // Recursively apply removeElementNodeIdReference to each child node
  for (let childNode = domNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
    applyYC5RecursivelyToDOMTree(childNode);
  }
}

module.exports = applyYC5RecursivelyToDOMTree;