/**
 * Recursively traverses a DOM tree starting from the given node and applies a test function to each node.
 * Returns true if the test function returns true for any node in the subtree.
 *
 * @param {Node} rootNode - The root DOM node to start traversal from.
 * @param {function(Node): boolean} testFunction - a predicate function to test each node.
 * @returns {boolean} True if any node in the subtree passes the testFunction, otherwise false.
 */
function traverseDomAndTest(rootNode, testFunction) {
  // If the test function returns true for the current node, return true
  if (testFunction(rootNode)) {
    return true;
  }

  // Recursively traverse the child nodes
  let currentChild = rootNode.firstChild;
  while (currentChild) {
    // If any child node or its descendants pass the test, return true
    if (traverseDomAndTest(currentChild, testFunction)) {
      return true;
    }
    currentChild = currentChild.nextSibling;
  }

  // No node in the subtree passed the test
  return false;
}

module.exports = traverseDomAndTest;