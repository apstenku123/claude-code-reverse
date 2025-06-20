/**
 * Traverses the 'return' chain of the given node, finds the first node that matches a specific condition,
 * and processes isBlobOrFileLikeObject with a handler function. Returns the processed result or null if no matching node is found.
 *
 * @param {Object} startNode - The node from which to start traversing the 'return' chain.
 * @returns {any} The result of processing the first matching node, or null if none found.
 */
function findAndProcessFirstMatchingReturnNode(startNode) {
  // Start with the 'return' property of the input node
  let currentNode = startNode.return;

  // Traverse up the 'return' chain
  while (currentNode !== null) {
    // If the current node matches the predicate, process and return isBlobOrFileLikeObject
    if (hasErrorHandlingLifecycle(currentNode)) {
      return BZ(currentNode);
    }
    // Move to the next node in the chain
    currentNode = currentNode.return;
  }

  // No matching node found in the chain
  return null;
}

module.exports = findAndProcessFirstMatchingReturnNode;