/**
 * Recursively traverses a DOM tree starting from a given node and applies a test function to each node.
 * Returns true if the test function returns true for any node in the tree, otherwise returns false.
 *
 * @param {Node} rootNode - The root DOM node to start traversal from.
 * @param {function(Node): boolean} testFunction - a function that tests each node. Should return true if the node matches the condition.
 * @returns {boolean} True if any node in the tree passes the testFunction, otherwise false.
 */
function traverseDomAndTestNode(rootNode, testFunction) {
  // If the test function returns true for the current node, return true
  if (testFunction(rootNode)) {
    return true;
  }

  // Recursively traverse child nodes
  let currentChild = rootNode.firstChild;
  while (currentChild) {
    // If any child node (or its descendants) passes the test, return true
    if (traverseDomAndTestNode(currentChild, testFunction)) {
      return true;
    }
    currentChild = currentChild.nextSibling;
  }

  // No matching node found in this subtree
  return false;
}

module.exports = traverseDomAndTestNode;