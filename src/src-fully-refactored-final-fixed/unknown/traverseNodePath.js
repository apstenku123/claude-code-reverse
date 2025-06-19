/**
 * Traverses a nested node structure following a path of keys and indices.
 *
 * @param {Object} rootNode - The root node to start traversal from. Should have 'type' and 'children' properties.
 * @param {Array<string|number>} path - An array representing the path to traverse. Each element is either:
 *   - a string: matches the 'value' property of a child node (when parent is an object node)
 *   - a number: selects the child at that index (when parent is an array node)
 * @returns {Object|undefined} - The node found at the end of the path, or undefined if traversal fails at any step.
 */
function traverseNodePath(rootNode, path) {
  if (!rootNode) return;
  let currentNode = rootNode;

  for (const pathSegment of path) {
    if (typeof pathSegment === "string") {
      // Expecting currentNode to be an object node with children
      if (currentNode.type !== "object" || !Array.isArray(currentNode.children)) {
        return;
      }
      let found = false;
      for (const childNode of currentNode.children) {
        // Check if childNode has children, first child matches the string, and has exactly two children
        if (
          Array.isArray(childNode.children) &&
          childNode.children[0].value === pathSegment &&
          childNode.children.length === 2
        ) {
          // Descend into the second child
          currentNode = childNode.children[1];
          found = true;
          break;
        }
      }
      if (!found) {
        return;
      }
    } else {
      // pathSegment is a number: expecting an array node
      const childIndex = pathSegment;
      if (
        currentNode.type !== "array" ||
        childIndex < 0 ||
        !Array.isArray(currentNode.children) ||
        childIndex >= currentNode.children.length
      ) {
        return;
      }
      currentNode = currentNode.children[childIndex];
    }
  }
  return currentNode;
}

module.exports = traverseNodePath;