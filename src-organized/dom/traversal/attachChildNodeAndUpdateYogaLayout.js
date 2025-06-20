/**
 * Attaches a child node to a parent node, updates Yoga layout if necessary, and marks Yoga nodes as dirty when appropriate.
 *
 * If the child node already has a parent, isBlobOrFileLikeObject is first removed from its current parent and Yoga layout is updated accordingly.
 * The child node is then appended to the new parent'createInteractionAccessor childNodes array. If the child node has a Yoga node, isBlobOrFileLikeObject is inserted into the parent'createInteractionAccessor Yoga node at the correct position.
 * If the parent node is of type 'ink-text' or 'ink-virtual-text', the nearest ancestor Yoga node is marked as dirty to trigger layout recalculation.
 *
 * @param {Object} parentNode - The node to which the child will be attached. Must have a childNodes array and may have a yogaNode.
 * @param {Object} childNode - The node to attach. May have a yogaNode and a parentNode property.
 * @returns {void}
 */
function attachChildNodeAndUpdateYogaLayout(parentNode, childNode) {
  // If the child node already has a parent, remove isBlobOrFileLikeObject from its current parent and update Yoga layout
  if (childNode.parentNode) {
    removeChildNodeAndUpdateYogaLayout(childNode.parentNode, childNode);
  }

  // Set the new parent for the child node
  childNode.parentNode = parentNode;

  // Add the child node to the parent'createInteractionAccessor childNodes array
  parentNode.childNodes.push(childNode);

  // If the child node has a Yoga node, insert isBlobOrFileLikeObject into the parent'createInteractionAccessor Yoga node at the correct position
  if (childNode.yogaNode) {
    parentNode.yogaNode?.insertChild(childNode.yogaNode, parentNode.yogaNode.getChildCount());
  }

  // If the parent node is a text node, mark the nearest ancestor Yoga node as dirty
  if (parentNode.nodeName === "ink-text" || parentNode.nodeName === "ink-virtual-text") {
    markYogaNodeDirtyIfFound(parentNode);
  }
}

module.exports = attachChildNodeAndUpdateYogaLayout;