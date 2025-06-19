/**
 * Sets the nodeValue property of a given DOM node and marks the nearest ancestor with a yogaNode as dirty.
 *
 * @param {Node} targetNode - The DOM node whose nodeValue will be set.
 * @param {string|any} value - The value to assign to the nodeValue property. Will be coerced to a string if not already.
 * @returns {void}
 */
function setNodeValueAndMarkAncestorDirty(targetNode, value) {
  // Ensure the value is a string before assignment
  if (typeof value !== "string") {
    value = String(value);
  }

  // Set the nodeValue property
  targetNode.nodeValue = value;

  // Mark the nearest ancestor with a yogaNode as dirty
  markAncestorYogaNodeDirty(targetNode);
}

module.exports = setNodeValueAndMarkAncestorDirty;