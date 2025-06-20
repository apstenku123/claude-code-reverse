/**
 * Checks if the given DOM node is a text node.
 *
 * @param {Node} node - The DOM node to check.
 * @returns {boolean} True if the node is a text node, false otherwise.
 */
function isTextNode(node) {
  // Ensure the node exists and its nodeType matches the TEXT_NODE constant
  return node && node.nodeType === Q8.TEXT_NODE;
}

module.exports = isTextNode;