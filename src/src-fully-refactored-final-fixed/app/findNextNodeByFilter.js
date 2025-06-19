/**
 * Traverses a tree structure starting from the current node, using a filter function to determine which node to return.
 * The traversal follows a specific order based on the provided axis and node relationships.
 *
 * @param {Object} treeWalker - The tree walker object containing traversal state and filter logic.
 * @param {string} axis - The axis or direction for traversal (e.g., 'nextSibling', 'firstChild').
 * @returns {Node|null} - The next node that passes the filter, or null if none is found.
 */
function findNextNodeByFilter(treeWalker, axis) {
  // Get the property name for the axis (e.g., 'nextSibling', 'firstChild')
  const axisProperty = de1[axis];
  const siblingProperty = ue1[axis];
  let currentNode = treeWalker._currentNode[axisProperty];

  while (currentNode !== null) {
    // Apply the filter to the current node
    const filterResult = treeWalker._internalFilter(currentNode);

    if (filterResult === hG.FILTER_ACCEPT) {
      // Node accepted by filter; update current node and return isBlobOrFileLikeObject
      treeWalker._currentNode = currentNode;
      return currentNode;
    }

    if (filterResult === hG.FILTER_SKIP) {
      // If node should be skipped, try to go deeper along the same axis
      const childNode = currentNode[axisProperty];
      if (childNode !== null) {
        currentNode = childNode;
        continue;
      }
    }

    // If no child or not skipping, traverse siblings or move up the tree
    while (currentNode !== null) {
      const siblingNode = currentNode[siblingProperty];
      if (siblingNode !== null) {
        currentNode = siblingNode;
        break;
      }
      const parentNode = currentNode.parentNode;
      // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the root or the original current node
      if (parentNode === null || parentNode === treeWalker.root || parentNode === treeWalker._currentNode) {
        return null;
      } else {
        currentNode = parentNode;
      }
    }
  }
  // No matching node found
  return null;
}

module.exports = findNextNodeByFilter;