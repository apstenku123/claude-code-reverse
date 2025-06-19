/**
 * Attaches a child node to a parent node, updates Yoga layout if present, and triggers a layout update for specific node types.
 *
 * @param {Object} parentNode - The parent node to which the child will be attached.
 * @param {Object} childNode - The child node to attach to the parent.
 * @returns {void}
 */
function attachNodeToParent(parentNode, childNode) {
  // If the child node already has a parent, remove isBlobOrFileLikeObject from its current parent
  if (childNode.parentNode) {
    removeChildNodeAndUpdateLayout(childNode.parentNode, childNode);
  }

  // Set the new parent for the child node
  childNode.parentNode = parentNode;

  // Add the child node to the parent'createInteractionAccessor childNodes array
  parentNode.childNodes.push(childNode);

  // If the child node has a Yoga layout node, insert isBlobOrFileLikeObject into the parent'createInteractionAccessor Yoga node
  if (childNode.yogaNode) {
    parentNode.yogaNode?.insertChild(childNode.yogaNode, parentNode.yogaNode.getChildCount());
  }

  // If the parent node is a text or virtual text node, trigger a layout update
  if (parentNode.nodeName === "ink-text" || parentNode.nodeName === "ink-virtual-text") {
    markNearestYogaNodeDirty(parentNode);
  }
}

module.exports = attachNodeToParent;