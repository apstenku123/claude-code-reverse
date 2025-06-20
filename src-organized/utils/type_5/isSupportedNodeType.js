/**
 * Checks if the provided DOM node has a nodeType matching one of the supported types.
 *
 * @param {Node} node - The DOM node to check.
 * @returns {boolean} True if the node'createInteractionAccessor nodeType matches any of the supported node types; otherwise, false.
 */
function isSupportedNodeType(node) {
  // Check if the node'createInteractionAccessor nodeType matches any of the supported node type constants
  return node.nodeType === bK1 || node.nodeType === nY5 || node.nodeType === JU2;
}

module.exports = isSupportedNodeType;