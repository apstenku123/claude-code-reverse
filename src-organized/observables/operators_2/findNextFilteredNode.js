/**
 * Traverses nodes starting from the reference node, applying an internal filter until a node is accepted or traversal ends.
 *
 * @param {Object} traversalContext - The traversal context containing the reference node, pointer, root, and filter method.
 * @param {any} boundaryNode - The node or value that acts as a boundary or stop condition for traversal.
 * @returns {Node|null} The next node that passes the internal filter, or null if none is found.
 */
function findNextFilteredNode(traversalContext, boundaryNode) {
  let currentNode = traversalContext._referenceNode;
  let pointerBeforeReferenceNode = traversalContext._pointerBeforeReferenceNode;

  while (true) {
    // If the pointer matches the boundary, toggle the pointer and continue
    if (pointerBeforeReferenceNode === boundaryNode) {
      pointerBeforeReferenceNode = !pointerBeforeReferenceNode;
    } else {
      // Move to the next node using getAdjacentObservableValue traversal logic
      currentNode = getAdjacentObservableValue(currentNode, traversalContext._root, boundaryNode);
      // If traversal reaches the end, return null
      if (currentNode === null) {
        return null;
      }
    }

    // Apply the internal filter to the current node
    const filterResult = traversalContext._internalFilter(currentNode);
    // If the node is accepted by the filter, break the loop
    if (filterResult === pe1.FILTER_ACCEPT) {
      break;
    }
    // Otherwise, continue traversing
  }

  // Update the traversal context with the new reference node and pointer
  traversalContext._referenceNode = currentNode;
  traversalContext._pointerBeforeReferenceNode = pointerBeforeReferenceNode;
  return currentNode;
}

module.exports = findNextFilteredNode;