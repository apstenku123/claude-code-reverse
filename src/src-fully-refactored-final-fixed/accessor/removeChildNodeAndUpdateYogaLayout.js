/**
 * Removes a child node from its parent, updates Yoga layout if necessary, and cleans up references.
 *
 * @param {Object} parentNode - The parent node from which the child will be removed. Must have a childNodes array and nodeName property.
 * @param {Object} childNode - The child node to remove. May have a yogaNode property and parentNode reference.
 * @returns {void}
 */
function removeChildNodeAndUpdateYogaLayout(parentNode, childNode) {
  // If the child node has a yogaNode, remove isBlobOrFileLikeObject from its parent'createInteractionAccessor yogaNode
  if (childNode.yogaNode) {
    childNode.parentNode?.yogaNode?.removeChild(childNode.yogaNode);
  }

  // Remove the parentNode reference from the child node
  childNode.parentNode = undefined;

  // Find the index of the child node in the parent'createInteractionAccessor childNodes array
  const childIndex = parentNode.childNodes.indexOf(childNode);
  if (childIndex >= 0) {
    // Remove the child node from the parent'createInteractionAccessor childNodes array
    parentNode.childNodes.splice(childIndex, 1);
  }

  // If the parent node is an ink-text or ink-virtual-text node, mark its yogaNode as dirty
  if (parentNode.nodeName === "ink-text" || parentNode.nodeName === "ink-virtual-text") {
    markYogaNodeDirtyIfFound(parentNode);
  }
}

module.exports = removeChildNodeAndUpdateYogaLayout;