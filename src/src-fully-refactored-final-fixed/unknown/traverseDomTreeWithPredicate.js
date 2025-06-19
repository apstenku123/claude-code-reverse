/**
 * Recursively traverses a DOM tree starting from a given node, applying a predicate function to each node.
 * Returns true if the predicate returns true for any node in the tree, otherwise returns false.
 *
 * @param {Node} rootNode - The root DOM node to start traversal from.
 * @param {function(Node): boolean} predicate - a function that takes a node and returns true if a condition is met.
 * @returns {boolean} True if the predicate returns true for any node in the tree, false otherwise.
 */
function traverseDomTreeWithPredicate(rootNode, predicate) {
  // Check if the predicate returns true for the current node
  if (predicate(rootNode)) {
    return true;
  }

  // Recursively check all child nodes (depth-first traversal)
  let currentChild = rootNode.firstChild;
  while (currentChild) {
    if (traverseDomTreeWithPredicate(currentChild, predicate)) {
      return true;
    }
    currentChild = currentChild.nextSibling;
  }

  // If no node satisfies the predicate, return false
  return false;
}

module.exports = traverseDomTreeWithPredicate;