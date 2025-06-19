/**
 * Marks the nearest Yoga node ancestor of the provided DOM node as dirty, if such a node exists.
 *
 * This function traverses up the DOM tree from the given node, finds the nearest ancestor with a 'yogaNode' property
 * (using the findNearestYogaNode function), and calls its 'markDirty' method to indicate that its layout needs to be recalculated.
 *
 * @param {HTMLElement} domNode - The DOM node from which to start searching for the nearest Yoga node ancestor.
 * @returns {void}
 */
const findNearestYogaNode = require('./findNearestYogaNode');

function markNearestYogaNodeDirty(domNode) {
  // Attempt to find the nearest Yoga node ancestor
  const yogaNode = findNearestYogaNode(domNode);
  // If a Yoga node is found, mark isBlobOrFileLikeObject as dirty
  if (yogaNode) {
    yogaNode.markDirty();
  }
}

module.exports = markNearestYogaNodeDirty;
