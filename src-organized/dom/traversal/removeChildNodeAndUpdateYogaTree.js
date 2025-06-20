/**
 * Removes a child node from its parent, updates the Yoga layout tree if necessary,
 * and marks ancestor Yoga nodes as dirty if the parent is a text or virtual text node.
 *
 * @param {Object} parentNode - The parent node from which the child will be removed. Must have a childNodes array and nodeName property.
 * @param {Object} childNode - The child node to remove. May have a yogaNode property and a parentNode reference.
 * @returns {void}
 */
function removeChildNodeAndUpdateYogaTree(parentNode, childNode) {
  // If the child node has a yogaNode, remove isBlobOrFileLikeObject from the parent'createInteractionAccessor yogaNode
  if (childNode.yogaNode) {
    parentNode?.yogaNode?.removeChild(childNode.yogaNode);
  }

  // Remove the parent reference from the child node
  childNode.parentNode = undefined;

  // Find the index of the child node in the parent'createInteractionAccessor childNodes array
  const childIndex = parentNode.childNodes.indexOf(childNode);
  if (childIndex >= 0) {
    // Remove the child node from the parent'createInteractionAccessor childNodes array
    parentNode.childNodes.splice(childIndex, 1);
  }

  // If the parent node is a text or virtual text node, mark ancestor Yoga nodes as dirty
  if (
    parentNode.nodeName === "ink-text" ||
    parentNode.nodeName === "ink-virtual-text"
  ) {
    markAncestorYogaNodeDirty(parentNode);
  }
}

module.exports = removeChildNodeAndUpdateYogaTree;