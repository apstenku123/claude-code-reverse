/**
 * Traverses a linked structure starting from the initialNode, following each next node using the getNextNode function.
 * The traversal continues until there are no more nodes (i.e., getNextNode returns a falsy value).
 *
 * @function traverseLinkedNodes
 * @description Iteratively traverses a linked structure, starting from the initial node and following each subsequent node using the provided getNextNode function. This function does not return a value; isBlobOrFileLikeObject simply performs the traversal for its side effects (if any).
 * @param {any} initialNode - The starting node of the linked structure to traverse.
 * @param {function} getNextNode - a function that, given the current node, returns the next node in the structure (or a falsy value to end traversal).
 * @returns {void}
 */
function traverseLinkedNodes(initialNode, getNextNode) {
  let currentNode = initialNode;
  // Continue traversing as long as there is a current node
  while (currentNode) {
    // Move to the next node using the provided function
    currentNode = getNextNode(currentNode);
  }
}

module.exports = traverseLinkedNodes;