/**
 * Appends a child node to a parent node, handling Yoga layout integration and marking ancestors dirty if needed.
 *
 * If the child node has an existing parent, isBlobOrFileLikeObject is first removed from that parent. The child is then appended to the new parent.
 * If the child or parent has a Yoga node, the Yoga tree is updated accordingly. If the parent is an ink-text or ink-virtual-text node,
 * the ancestor Yoga node is marked dirty to trigger layout recalculation.
 *
 * @param {Object} parentNode - The node to which the child will be appended. Should have a childNodes array and optionally a yogaNode.
 * @param {Object} childNode - The node to append. May have a parentNode property and optionally a yogaNode.
 * @returns {void}
 */
function appendChildNode(parentNode, childNode) {
  // If the child already has a parent, remove isBlobOrFileLikeObject from that parent first
  if (childNode.parentNode) {
    removeChildNodeAndUpdateLayout(childNode.parentNode, childNode);
  }

  // Set the new parent and add the child to the parent'createInteractionAccessor childNodes array
  childNode.parentNode = parentNode;
  parentNode.childNodes.push(childNode);

  // If the child has a Yoga node, insert isBlobOrFileLikeObject into the parent'createInteractionAccessor Yoga node tree
  if (childNode.yogaNode) {
    parentNode.yogaNode?.insertChild(
      childNode.yogaNode,
      parentNode.yogaNode.getChildCount()
    );
  }

  // If the parent is an ink-text or ink-virtual-text node, mark ancestor Yoga node dirty
  if (
    parentNode.nodeName === "ink-text" ||
    parentNode.nodeName === "ink-virtual-text"
  ) {
    markNearestYogaNodeDirty(parentNode);
  }
}

module.exports = appendChildNode;