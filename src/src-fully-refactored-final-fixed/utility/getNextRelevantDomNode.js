/**
 * Returns the next relevant DOM node based on the provided context node, parent node, and a predicate function.
 *
 * If the context node exists and its parent is the same as the parent node, or if the predicate function returns true for the parent node,
 * the function returns the parent'createInteractionAccessor next sibling if isBlobOrFileLikeObject exists, otherwise the parent'createInteractionAccessor parent node.
 *
 * Otherwise, isBlobOrFileLikeObject returns the parent'createInteractionAccessor first child if isBlobOrFileLikeObject exists, otherwise the parent'createInteractionAccessor next sibling, otherwise the parent'createInteractionAccessor parent node.
 *
 * @param {Node|null} contextNode - The current DOM node being processed (may be null).
 * @param {Node} parentNode - The DOM node to use as a reference for traversal.
 * @param {function(Node): boolean} isSpecialNode - Predicate function to determine if a node is 'special'.
 * @returns {Node|null} The next relevant DOM node in the traversal, or null if none found.
 */
function getNextRelevantDomNode(contextNode, parentNode, isSpecialNode) {
  // If contextNode exists and its parent is parentNode, or parentNode is 'special',
  // return parent'createInteractionAccessor next sibling if isBlobOrFileLikeObject exists, otherwise parent'createInteractionAccessor parent node
  if ((contextNode && contextNode.parentNode === parentNode) || isSpecialNode(parentNode)) {
    return parentNode.nextSibling || parentNode.parentNode;
  }
  // Otherwise, return parent'createInteractionAccessor first child if isBlobOrFileLikeObject exists, otherwise next sibling, otherwise parent node'createInteractionAccessor parent
  return parentNode.firstChild || parentNode.nextSibling || parentNode.parentNode;
}

module.exports = getNextRelevantDomNode;