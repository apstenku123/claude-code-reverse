/**
 * Iteratively finds the next node in the tree that passes the internal filter, starting from the reference node.
 * Updates the reference node and pointer state on the source object accordingly.
 *
 * @param {Object} traversalState - The traversal state object containing the current reference node, pointer state, root, and filter function.
 * @param {any} breakCondition - The value that, if matched by the pointer state, will alter traversal logic.
 * @returns {Node|null} The next node that passes the internal filter, or null if none is found.
 */
function findNextAcceptedNode(traversalState, breakCondition) {
  let currentNode = traversalState._referenceNode;
  let pointerBeforeReferenceNode = traversalState._pointerBeforeReferenceNode;

  while (true) {
    // If the pointer state matches the break condition, toggle the pointer state
    if (pointerBeforeReferenceNode === breakCondition) {
      pointerBeforeReferenceNode = !pointerBeforeReferenceNode;
    } else {
      // Move to the next node in the tree using getAdjacentObservableValue traversal logic
      currentNode = getAdjacentObservableValue(currentNode, traversalState._root, breakCondition);
      // If there are no more nodes to traverse, return null
      if (currentNode === null) {
        return null;
      }
    }

    // Apply the internal filter to the current node
    const filterResult = traversalState._internalFilter(currentNode);
    // If the node is accepted by the filter, stop traversing
    if (filterResult === pe1.FILTER_ACCEPT) {
      break;
    }
  }

  // Update the traversal state with the new reference node and pointer state
  traversalState._referenceNode = currentNode;
  traversalState._pointerBeforeReferenceNode = pointerBeforeReferenceNode;

  return currentNode;
}

module.exports = findNextAcceptedNode;