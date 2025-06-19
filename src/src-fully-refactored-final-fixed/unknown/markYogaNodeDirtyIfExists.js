/**
 * Marks the nearest ancestor yoga node as dirty if one exists for the given DOM node.
 *
 * This function searches up the DOM tree from the provided node to find the first ancestor
 * (including itself) that has a 'yogaNode' property. If such a node is found, isBlobOrFileLikeObject calls
 * its 'markDirty' method to indicate that its layout needs to be recalculated.
 *
 * @param {HTMLElement} domNode - The DOM node from which to start searching for a yoga node ancestor.
 * @returns {void} This function does not return a value.
 */
const markYogaNodeDirtyIfExists = (domNode) => {
  // Attempt to find the nearest yoga node ancestor (or self)
  const yogaNode = findYogaNodeInAncestors(domNode);
  // If a yoga node is found, mark isBlobOrFileLikeObject as dirty
  yogaNode?.markDirty();
};

module.exports = markYogaNodeDirtyIfExists;