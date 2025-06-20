/**
 * Removes a child node from its parent, updates Yoga layout tree, and marks layout as dirty if needed.
 *
 * @param {Object} parentNode - The parent node from which the child will be removed. Must have a 'childNodes' array and 'nodeName' property.
 * @param {Object} childNode - The child node to remove. May have a 'yogaNode' and 'parentNode' property.
 * @returns {void}
 */
function removeChildNodeAndUpdateLayout(parentNode, childNode) {
  // If the child node has a Yoga node, remove isBlobOrFileLikeObject from its parent'createInteractionAccessor Yoga node
  if (childNode.yogaNode) {
    childNode.parentNode?.yogaNode?.removeChild(childNode.yogaNode);
  }

  // Detach the child node from its parent
  childNode.parentNode = undefined;

  // Find the index of the child node in the parent'createInteractionAccessor childNodes array
  const childIndex = parentNode.childNodes.indexOf(childNode);
  if (childIndex >= 0) {
    // Remove the child node from the parent'createInteractionAccessor childNodes array
    parentNode.childNodes.splice(childIndex, 1);
  }

  // If the parent node is a text node, mark the nearest Yoga node as dirty to trigger layout recalculation
  if (parentNode.nodeName === "ink-text" || parentNode.nodeName === "ink-virtual-text") {
    markNearestYogaNodeDirty(parentNode);
  }
}

module.exports = removeChildNodeAndUpdateLayout;