/**
 * Inserts a child node into a parent node'createInteractionAccessor childNodes array, either before a reference node or at the end.
 * Handles Yoga layout tree insertion if yogaNode is present, and triggers a layout update for specific node types.
 *
 * @param {Object} parentNode - The parent node to insert into. Must have childNodes array and optional yogaNode.
 * @param {Object} childNode - The node to insert. May have a yogaNode property.
 * @param {Object} referenceNode - The node before which childNode should be inserted. If not found, childNode is appended.
 * @returns {void}
 */
function insertNodeBeforeReference(parentNode, childNode, referenceNode) {
  // If childNode already has a parent, remove isBlobOrFileLikeObject from its current parent
  if (childNode.parentNode) {
    removeChildNodeAndUpdateLayout(childNode.parentNode, childNode);
  }

  // Set the new parent
  childNode.parentNode = parentNode;

  // Find the index of the reference node in the parent'createInteractionAccessor childNodes array
  const referenceIndex = parentNode.childNodes.indexOf(referenceNode);

  if (referenceIndex >= 0) {
    // Insert childNode at the reference index
    parentNode.childNodes.splice(referenceIndex, 0, childNode);
    // If using Yoga layout, insert the yogaNode at the same index
    if (childNode.yogaNode) {
      parentNode.yogaNode?.insertChild(childNode.yogaNode, referenceIndex);
    }
    return;
  }

  // If referenceNode is not found, append childNode to the end
  parentNode.childNodes.push(childNode);
  // If using Yoga layout, insert the yogaNode at the end
  if (childNode.yogaNode) {
    parentNode.yogaNode?.insertChild(childNode.yogaNode, parentNode.yogaNode.getChildCount());
  }

  // If the parent node is a text node, trigger a layout update
  if (parentNode.nodeName === "ink-text" || parentNode.nodeName === "ink-virtual-text") {
    markNearestYogaNodeDirty(parentNode);
  }
}

module.exports = insertNodeBeforeReference;
