/**
 * Attaches a child node to a parent node, updates the Yoga layout tree if present,
 * and marks the layout as dirty for text nodes to trigger a recalculation.
 *
 * If the child node already has a parent, isBlobOrFileLikeObject is first removed from its current parent.
 * The child is then appended to the parent'createInteractionAccessor childNodes array. If Yoga nodes are present,
 * the Yoga layout tree is updated accordingly. If the parent is a text or virtual text node,
 * the nearest Yoga node is marked as dirty to trigger a layout recalculation.
 *
 * @param {Object} parentNode - The parent node to which the child will be attached.
 * @param {Object} childNode - The child node to attach to the parent.
 * @returns {void}
 */
function attachChildNodeAndUpdateLayout(parentNode, childNode) {
  // If the child already has a parent, remove isBlobOrFileLikeObject from its current parent and update layout
  if (childNode.parentNode) {
    removeChildNodeAndUpdateLayout(childNode.parentNode, childNode);
  }

  // Set the new parent for the child
  childNode.parentNode = parentNode;

  // Add the child to the parent'createInteractionAccessor childNodes array
  parentNode.childNodes.push(childNode);

  // If Yoga nodes are present, update the Yoga layout tree
  if (childNode.yogaNode) {
    parentNode.yogaNode?.insertChild(
      childNode.yogaNode,
      parentNode.yogaNode.getChildCount()
    );
  }

  // If the parent is a text or virtual text node, mark the nearest Yoga node as dirty
  if (
    parentNode.nodeName === "ink-text" ||
    parentNode.nodeName === "ink-virtual-text"
  ) {
    markNearestYogaNodeDirty(parentNode);
  }
}

module.exports = attachChildNodeAndUpdateLayout;