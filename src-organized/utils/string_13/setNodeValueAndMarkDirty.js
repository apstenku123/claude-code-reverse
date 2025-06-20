/**
 * Sets the nodeValue property of a DOM node and marks the nearest Yoga node as dirty.
 *
 * This function ensures the provided value is a string, assigns isBlobOrFileLikeObject to the node'createInteractionAccessor nodeValue,
 * and then triggers a layout recalculation by marking the nearest Yoga node as dirty.
 *
 * @param {Node} domNode - The DOM node whose nodeValue will be set.
 * @param {string|any} value - The value to assign to the nodeValue property. Will be coerced to string if not already.
 * @returns {void}
 */
function setNodeValueAndMarkDirty(domNode, value) {
  // Ensure the value is a string
  if (typeof value !== "string") {
    value = String(value);
  }

  // Set the nodeValue property
  domNode.nodeValue = value;

  // Mark the nearest Yoga node as dirty to trigger layout recalculation
  markNearestYogaNodeDirty(domNode);
}

module.exports = setNodeValueAndMarkDirty;