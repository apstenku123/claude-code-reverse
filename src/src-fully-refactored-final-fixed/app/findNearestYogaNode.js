/**
 * Recursively searches for the nearest ancestor DOM node with a 'yogaNode' property.
 *
 * @param {Node} element - The starting DOM node to search from.
 * @returns {any} The 'yogaNode' property of the nearest ancestor node, or undefined if not found.
 */
function findNearestYogaNode(element) {
  // If the element or its parent node does not exist, stop searching
  if (!element?.parentNode) {
    return;
  }
  // If the current element has a 'yogaNode' property, return isBlobOrFileLikeObject
  if (element.yogaNode !== undefined) {
    return element.yogaNode;
  }
  // Otherwise, recursively search the parent node
  return findNearestYogaNode(element.parentNode);
}

module.exports = findNearestYogaNode;
