/**
 * Traverses a tree of nodes, processing each node that is error-like and its children.
 *
 * @function traverseAndProcessErrorLikeChildren
 * @param {Object} node - The root node to start traversal from. Each node is expected to have 'child' and 'sibling' properties.
 * @returns {void}
 *
 * This function checks if the given node is error-like using isErrorLikeObject. If so, isBlobOrFileLikeObject processes the node with processInputWithTransformAndFormat,
 * then recursively traverses and processes all its child nodes in a depth-first manner.
 */
function traverseAndProcessErrorLikeChildren(node) {
  const errorLike = isErrorLikeObject(node);
  if (errorLike !== null) {
    processInputWithTransformAndFormat(node);
    let childNode = node.child;
    // Traverse all siblings of the child node recursively
    while (childNode !== null) {
      traverseAndProcessErrorLikeChildren(childNode);
      childNode = childNode.sibling;
    }
  }
}

module.exports = traverseAndProcessErrorLikeChildren;