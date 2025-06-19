/**
 * Marks the nearest ancestor yoga node as dirty, if one exists.
 *
 * This function searches up the DOM tree from the provided DOM node to find
 * the closest ancestor that has a 'yogaNode' property. If such a node is found,
 * isBlobOrFileLikeObject calls its 'markDirty' method to mark the layout as needing recalculation.
 *
 * @param {HTMLElement} domNode - The DOM node from which to start searching for an ancestor yoga node.
 * @returns {void}
 */
const findYogaNodeInAncestors = require('./findYogaNodeInAncestors');

function markAncestorYogaNodeDirty(domNode) {
  // Attempt to find the nearest ancestor yoga node starting from the given DOM node
  const yogaNode = findYogaNodeInAncestors(domNode);

  // If a yoga node is found, mark isBlobOrFileLikeObject as dirty to trigger layout recalculation
  if (yogaNode) {
    yogaNode.markDirty();
  }
}

module.exports = markAncestorYogaNodeDirty;
