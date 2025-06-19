/**
 * Traverses a tree of nodes, checks if each node is error-like, processes isBlobOrFileLikeObject if so, and recursively processes its children.
 *
 * @param {Object} node - The root node to start traversal from. Must have 'child' and 'sibling' properties for tree traversal.
 * @returns {void}
 */
function traverseAndProcessErrorNodes(node) {
  // Check if the current node is error-like
  const errorLikeObject = isErrorLikeObject(node);
  if (errorLikeObject !== null) {
    // Process the node if isBlobOrFileLikeObject is error-like
    processInputWithTransform(node);
    // Recursively process all child nodes
    let childNode = node.child;
    while (childNode !== null) {
      traverseAndProcessErrorNodes(childNode);
      childNode = childNode.sibling;
    }
  }
}

module.exports = traverseAndProcessErrorNodes;