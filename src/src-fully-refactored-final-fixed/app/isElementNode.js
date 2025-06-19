/**
 * Checks if the provided object is a DOM Element node.
 *
 * @param {object} node - The object to check for element node type.
 * @returns {boolean} True if the object is a DOM Element node, false otherwise.
 */
function isElementNode(node) {
  // Ensure the node exists and its nodeType matches ELEMENT_NODE
  return node && node.nodeType === Q8.ELEMENT_NODE;
}

module.exports = isElementNode;