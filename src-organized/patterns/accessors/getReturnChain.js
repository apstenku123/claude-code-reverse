/**
 * Traverses the linked list of objects via their `return` property, starting from the given node,
 * and collects all nodes in an array. The traversal stops when a node with a null `return` property is reached.
 *
 * @param {Object} startNode - The starting node of the chain. Each node is expected to have a `return` property pointing to its parent node, or null.
 * @returns {Object[]} An array containing the chain of nodes from the starting node up to the root (where `return` is null), in order from child to parent.
 */
function getReturnChain(startNode) {
  const nodeChain = [];
  let currentNode = startNode;

  // Traverse up the chain via the 'return' property
  while (currentNode !== null) {
    nodeChain.push(currentNode);
    currentNode = currentNode.return;
  }

  return nodeChain;
}

module.exports = getReturnChain;