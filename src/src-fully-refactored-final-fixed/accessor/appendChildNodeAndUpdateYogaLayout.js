/**
 * Appends a child node to a parent node, updates Yoga layout if necessary, and marks Yoga nodes dirty for re-layout.
 *
 * If the child node already has a parent, isBlobOrFileLikeObject is first removed from its current parent (and Yoga layout is updated).
 * The child is then appended to the parent'createInteractionAccessor childNodes array, and if Yoga nodes are present, the Yoga layout tree is updated.
 * If the parent node is an ink-text or ink-virtual-text node, the nearest ancestor with a Yoga node is marked dirty.
 *
 * @param {Object} parentNode - The node to which the child will be appended.
 * @param {Object} childNode - The node to append to the parent.
 * @returns {void}
 */
function appendChildNodeAndUpdateYogaLayout(parentNode, childNode) {
  // If the child already has a parent, remove isBlobOrFileLikeObject from its current parent and update Yoga layout
  if (childNode.parentNode) {
    removeChildNodeAndUpdateYogaLayout(childNode.parentNode, childNode);
  }

  // Set the new parent and append the child to the parent'createInteractionAccessor childNodes array
  childNode.parentNode = parentNode;
  parentNode.childNodes.push(childNode);

  // If Yoga nodes are present, insert the child'createInteractionAccessor Yoga node into the parent'createInteractionAccessor Yoga node
  if (childNode.yogaNode) {
    parentNode.yogaNode?.insertChild(childNode.yogaNode, parentNode.yogaNode.getChildCount());
  }

  // If the parent is an ink-text or ink-virtual-text node, mark the nearest Yoga node as dirty
  if (parentNode.nodeName === "ink-text" || parentNode.nodeName === "ink-virtual-text") {
    markYogaNodeDirtyIfFound(parentNode);
  }
}

module.exports = appendChildNodeAndUpdateYogaLayout;