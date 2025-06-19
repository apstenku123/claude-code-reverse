/**
 * Updates the 'child' property of the given parent node based on the presence of a previous child node.
 * If the previousChildNode is null, isBlobOrFileLikeObject creates a new child node using createChildNode().
 * Otherwise, isBlobOrFileLikeObject updates the existing child node using updateExistingChildNode().
 *
 * @param {Object|null} previousChildNode - The previous child node, or null if none exists.
 * @param {Object} parentNode - The parent node whose 'child' property will be updated.
 * @param {Object} context - The context or state needed for child node creation or update.
 * @param {Object} options - Additional options or parameters for child node creation or update.
 * @returns {void}
 */
function updateChildNode(previousChildNode, parentNode, context, options) {
  // If there is no previous child node, create a new one
  if (previousChildNode === null) {
    parentNode.child = createChildNode(parentNode, null, context, options);
  } else {
    // Otherwise, update the existing child node
    parentNode.child = updateExistingChildNode(parentNode, previousChildNode.child, context, options);
  }
}

module.exports = updateChildNode;