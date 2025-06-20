/**
 * Traverses a tree of nodes and collects nodes that do not have a matching entry in the reference array.
 *
 * @param {Object} rootNode - The root node to start traversal from.
 * @param {Array} referenceArray - An array of reference objects to match against.
 * @returns {Array} An array of nodes from the tree that do not match any entry in the reference array.
 */
function collectUnmatchedNodes(rootNode, referenceArray) {
  const unmatchedNodes = [];
  // Stack for iterative tree traversal: stores [node, referenceIndex] pairs
  const traversalStack = [rootNode, 0];

  let stackIndex = 0;
  while (stackIndex < traversalStack.length) {
    const currentNode = traversalStack[stackIndex++];
    let referenceIndex = traversalStack[stackIndex++];
    let referenceEntry = referenceArray[referenceIndex];

    // If node is not of tag 5 or fails the vA check, process for matching
    if (currentNode.tag !== 5 || !vA(currentNode)) {
      // Advance referenceIndex while currentNode matches the reference entry
      while (referenceEntry != null && CT(currentNode, referenceEntry)) {
        referenceIndex++;
        referenceEntry = referenceArray[referenceIndex];
      }
      // If handleMissingDoctypeError'removeTrailingCharacters exhausted the reference array, collect the node
      if (referenceIndex === referenceArray.length) {
        unmatchedNodes.push(currentNode);
      } else {
        // Otherwise, traverse the children of the current node
        let childNode = currentNode.child;
        while (childNode !== null) {
          traversalStack.push(childNode, referenceIndex);
          childNode = childNode.sibling;
        }
      }
    }
  }
  return unmatchedNodes;
}

module.exports = collectUnmatchedNodes;