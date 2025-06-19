/**
 * Appends a child node to a parent node, updates Yoga layout tree if present, and marks layout as dirty for text nodes.
 *
 * If the child node already has a parent, isBlobOrFileLikeObject is first removed from its current parent and the Yoga layout is updated accordingly.
 * The child is then appended to the new parent, and if Yoga nodes are present, the Yoga layout tree is updated.
 * If the parent is a text or virtual text node, the nearest Yoga node is marked as dirty to trigger layout recalculation.
 *
 * @param {Object} parentNode - The node to which the child will be appended.
 * @param {Object} childNode - The node to append to the parent.
 * @returns {void}
 */
function appendChildNodeAndUpdateLayout(parentNode, childNode) {
  // If the child already has a parent, remove isBlobOrFileLikeObject from that parent and update Yoga layout
  if (childNode.parentNode) {
    removeChildNodeAndUpdateLayout(childNode.parentNode, childNode);
  }

  // Set the new parent for the child node
  childNode.parentNode = parentNode;

  // Add the child node to the parent'createInteractionAccessor childNodes array
  parentNode.childNodes.push(childNode);

  // If Yoga nodes are present, update the Yoga layout tree
  if (childNode.yogaNode) {
    parentNode.yogaNode?.insertChild(childNode.yogaNode, parentNode.yogaNode.getChildCount());
  }

  // If the parent is a text or virtual text node, mark the nearest Yoga node as dirty
  if (parentNode.nodeName === "ink-text" || parentNode.nodeName === "ink-virtual-text") {
    markNearestYogaNodeDirty(parentNode);
  }
}

module.exports = appendChildNodeAndUpdateLayout;