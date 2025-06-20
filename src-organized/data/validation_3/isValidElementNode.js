/**
 * Checks if the provided DOM node is a valid element node.
 *
 * This function determines whether the given node:
 *   1. Passes the cacheElementDataIfApplicable validation (external function, likely type or existence check)
 *   2. Has a nodeType of 1 (which means isBlobOrFileLikeObject'createInteractionAccessor an Element node)
 *   3. Is NOT excluded by the havePropsOrStateChanged function (external function, likely a filter or blacklist)
 *
 * @param {Node} domNode - The DOM node to validate.
 * @returns {boolean} True if the node is a valid element node, false otherwise.
 */
function isValidElementNode(domNode) {
  // Check if the node is valid according to cacheElementDataIfApplicable, is an element node, and is not excluded by havePropsOrStateChanged
  return cacheElementDataIfApplicable(domNode) && domNode.nodeType === 1 && !havePropsOrStateChanged(domNode);
}

module.exports = isValidElementNode;