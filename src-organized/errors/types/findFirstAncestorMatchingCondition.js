/**
 * Traverses up the 'return' chain of the given node and returns the result of BZ (isErrorLikeObject)
 * for the first ancestor node that satisfies the hasErrorHandlingLifecycle(matching condition) predicate.
 *
 * @param {Object} node - The starting node to begin traversal from. Expected to have a 'return' property.
 * @returns {any} The result of BZ (isErrorLikeObject) for the first ancestor node matching hasErrorHandlingLifecycle, or null if none found.
 */
function findFirstAncestorMatchingCondition(node) {
  let currentNode = node.return;
  // Traverse up the 'return' chain
  while (currentNode !== null) {
    // If the current node matches the predicate, return the processed result
    if (hasErrorHandlingLifecycle(currentNode)) {
      return BZ(currentNode);
    }
    currentNode = currentNode.return;
  }
  // No matching ancestor found
  return null;
}

module.exports = findFirstAncestorMatchingCondition;
