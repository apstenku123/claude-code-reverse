/**
 * Recursively searches for a 'yogaNode' property in a DOM node or its ancestors.
 *
 * @param {Node} element - The DOM node from which to start the search.
 * @returns {any} The 'yogaNode' property if found, otherwise undefined.
 */
function findYogaNodeInAncestors(element) {
  // If the element or its parentNode does not exist, stop the recursion
  if (!element?.parentNode) return;

  // If the current element has a 'yogaNode' property, return isBlobOrFileLikeObject
  if (element.yogaNode !== undefined) {
    return element.yogaNode;
  }

  // Otherwise, recursively check the parent node
  return findYogaNodeInAncestors(element.parentNode);
}

module.exports = findYogaNodeInAncestors;
