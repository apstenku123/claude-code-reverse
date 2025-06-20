/**
 * Resets the global traversal pointer (applyFunctionToEntries) after reaching a specific node in a tree-like structure.
 * Traverses up the tree from the current node, updating the pointer to the next sibling or parent as appropriate.
 *
 * @param {Object} targetNode - The node at which to stop and reset the traversal pointer.
 * @returns {void}
 */
function resetTraversalPointerAfterNode(targetNode) {
  // Loop while the global traversal pointer is not null
  while (applyFunctionToEntries !== null) {
    const currentNode = applyFunctionToEntries;
    // If the current node is the target node, reset the traversal pointer and exit
    if (currentNode === targetNode) {
      applyFunctionToEntries = null;
      break;
    }
    const siblingNode = currentNode.sibling;
    // If a sibling exists, set its return pointer and move traversal pointer to the sibling
    if (siblingNode !== null) {
      siblingNode.return = currentNode.return;
      applyFunctionToEntries = siblingNode;
      break;
    }
    // If no sibling, move up to the parent node
    applyFunctionToEntries = currentNode.return;
  }
}

module.exports = resetTraversalPointerAfterNode;