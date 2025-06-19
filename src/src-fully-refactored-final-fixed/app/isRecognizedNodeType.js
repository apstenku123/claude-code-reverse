/**
 * Checks if the given node'createInteractionAccessor type matches any of the recognized node type constants.
 *
 * @param {Object} node - The node object to check. Must have a 'nodeType' property.
 * @returns {boolean} True if the node'createInteractionAccessor type matches one of the recognized types; otherwise, false.
 */
function isRecognizedNodeType(node) {
  // Compare node.nodeType against the three recognized constants
  return node.nodeType === bK1 || node.nodeType === nY5 || node.nodeType === JU2;
}

module.exports = isRecognizedNodeType;