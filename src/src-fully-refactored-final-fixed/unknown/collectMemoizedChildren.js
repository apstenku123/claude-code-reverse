/**
 * Traverses a tree of nodes, collecting memoized child nodes into a result array.
 *
 * If the current node is not a container (as determined by isContainerNode),
 * isBlobOrFileLikeObject is processed and added to the result array. Otherwise, the function recursively
 * traverses its children. Special handling is applied for nodes with a specific tag
 * and non-null memoized state, where traversal may skip to a deeper child node.
 *
 * @param {Object} node - The current node in the tree to process.
 * @param {Array} resultArray - The array to collect processed nodes into.
 * @returns {void}
 */
function collectMemoizedChildren(node, resultArray) {
  // If the node is not a container, process and collect isBlobOrFileLikeObject
  if (!isContainerNode(node)) {
    resultArray.push(processNode(node));
    return;
  }

  let childNode = node.child;
  // Check for special case: node has a specific tag and a non-null memoized state
  const isSpecialMemoizedNode = node.tag === SPECIAL_MEMOIZED_TAG && node.memoizedState !== null;

  if (isSpecialMemoizedNode) {
    const firstChild = node.child;
    const siblingOfFirstChild = firstChild ? firstChild.sibling : null;
    const childOfSibling = siblingOfFirstChild ? siblingOfFirstChild.child : null;
    // If such a child exists, start traversal from there
    if (childOfSibling !== null) {
      childNode = childOfSibling;
    }
  }

  // Recursively process all siblings
  while (childNode !== null) {
    collectMemoizedChildren(childNode, resultArray);
    childNode = childNode.sibling;
  }
}

module.exports = collectMemoizedChildren;