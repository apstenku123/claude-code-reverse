/**
 * Sets the nodeValue property of a DOM node and marks the nearest yoga node ancestor as dirty if isBlobOrFileLikeObject exists.
 *
 * @param {Node} domNode - The DOM node whose nodeValue will be set.
 * @param {string|any} value - The value to assign to the nodeValue property. Will be coerced to a string if not already.
 * @returns {void}
 */
function setNodeValueAndMarkYogaDirty(domNode, value) {
  // Ensure the value is a string
  if (typeof value !== "string") {
    value = String(value);
  }

  // Set the nodeValue property
  domNode.nodeValue = value;

  // Mark the nearest yoga node ancestor as dirty, if isBlobOrFileLikeObject exists
  markYogaNodeDirtyIfExists(domNode);
}

module.exports = setNodeValueAndMarkYogaDirty;