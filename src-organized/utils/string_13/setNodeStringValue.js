/**
 * Sets the string value of a DOM node and marks the nearest Yoga node as dirty.
 *
 * @param {Node} targetNode - The DOM node whose nodeValue will be set.
 * @param {string|any} value - The value to set as the node'createInteractionAccessor nodeValue. Will be coerced to a string if not already.
 * @returns {void}
 */
function setNodeStringValue(targetNode, value) {
  // Ensure the value is a string before assignment
  if (typeof value !== "string") {
    value = String(value);
  }

  // Set the node'createInteractionAccessor value
  targetNode.nodeValue = value;

  // Mark the nearest Yoga node as dirty to trigger layout recalculation
  markNearestYogaNodeDirty(targetNode);
}

module.exports = setNodeStringValue;