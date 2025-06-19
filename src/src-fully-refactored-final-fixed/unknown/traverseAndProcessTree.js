/**
 * Traverses a tree structure starting from the given node, processes the node if a condition is met,
 * and recursively processes all child and sibling nodes.
 *
 * @param {Object} rootNode - The root node of the tree/subtree to process. Must have 'child' and 'sibling' properties.
 * @returns {void}
 */
function traverseAndProcessTree(rootNode) {
  // Check if the node meets the processing condition
  const processedNode = processInputWithTransformations(rootNode);
  if (processedNode !== null) {
    // Perform the required processing on the current node
    processNode(rootNode);
    // Recursively process all children of the current node
    let currentChild = rootNode.child;
    while (currentChild !== null) {
      traverseAndProcessTree(currentChild);
      currentChild = currentChild.sibling;
    }
  }
}

module.exports = traverseAndProcessTree;