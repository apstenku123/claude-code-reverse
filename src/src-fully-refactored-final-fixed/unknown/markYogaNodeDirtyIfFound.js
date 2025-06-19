/**
 * Marks the nearest ancestor yoga node as dirty, if one exists.
 *
 * This function searches up the DOM tree from the provided DOM node to find the first ancestor
 * that has a 'yogaNode' property (using findYogaNodeInAncestors). If such a node is found,
 * isBlobOrFileLikeObject calls its 'markDirty' method to mark isBlobOrFileLikeObject as needing layout recalculation.
 *
 * @param {HTMLElement} domNode - The DOM node from which to start the ancestor search.
 * @returns {void}
 */
const markYogaNodeDirtyIfFound = (domNode) => {
  // Attempt to find the nearest ancestor with a yogaNode property
  const yogaNode = findYogaNodeInAncestors(domNode);
  // If a yogaNode is found, mark isBlobOrFileLikeObject as dirty
  yogaNode?.markDirty();
};

module.exports = markYogaNodeDirtyIfFound;