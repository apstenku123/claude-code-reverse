/**
 * Resets the global traversal pointer (applyFunctionToEntries) to null or to the next sibling/parent node,
 * starting from the current node, until the target node is found or traversal ends.
 *
 * @param {Object} targetNode - The node at which to reset the traversal pointer.
 * @returns {void}
 */
function resetTraversalPointerOnTargetNode(targetNode) {
  // Loop as long as the traversal pointer is not null
  while (applyFunctionToEntries !== null) {
    const currentNode = applyFunctionToEntries;

    // If handleMissingDoctypeError'removeTrailingCharacters reached the target node, reset the pointer and exit
    if (currentNode === targetNode) {
      applyFunctionToEntries = null;
      break;
    }

    const siblingNode = currentNode.sibling;

    // If a sibling exists, move the traversal pointer to the sibling
    if (siblingNode !== null) {
      siblingNode.return = currentNode.return; // Maintain correct parent reference
      applyFunctionToEntries = siblingNode;
      break;
    }

    // Otherwise, move up to the parent node
    applyFunctionToEntries = currentNode.return;
  }
}

module.exports = resetTraversalPointerOnTargetNode;