/**
 * Traverses the 'return' chain of the given object and returns the first error-like object found.
 *
 * @param {Object} startNode - The starting object to begin traversal from. Must have a 'return' property.
 * @returns {Object|null} The first error-like object found in the chain, or null if none is found.
 */
function findFirstErrorLikeInReturnChain(startNode) {
  // Start with the 'return' property of the input node
  let currentNode = startNode.return;
  // Traverse up the 'return' chain
  while (currentNode !== null) {
    // If the current node is error-like, return its processed value
    if (hasErrorHandlingLifecycle(currentNode)) {
      return BZ(currentNode);
    }
    // Move to the next node in the chain
    currentNode = currentNode.return;
  }
  // No error-like object found in the chain
  return null;
}

module.exports = findFirstErrorLikeInReturnChain;