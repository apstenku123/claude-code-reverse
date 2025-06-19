/**
 * Traverses a nested node structure according to a given path of keys and indices.
 *
 * @param {Object} rootNode - The root node to start traversal from. Must have 'type' and 'children' properties.
 * @param {Array<string|number>} path - An array representing the path to traverse. Each element is either a string (object key) or a number (array index).
 * @returns {Object|undefined} - The node found at the end of the path, or undefined if the path is invalid.
 */
function traverseNodeByPath(rootNode, path) {
  if (!rootNode) return;
  let currentNode = rootNode;

  for (const pathSegment of path) {
    if (typeof pathSegment === "string") {
      // Expecting currentNode to be an object node with children
      if (currentNode.type !== "object" || !Array.isArray(currentNode.children)) {
        return;
      }
      let found = false;
      // Search for a child whose first child has a value matching the string key
      for (const child of currentNode.children) {
        if (
          Array.isArray(child.children) &&
          child.children[0].value === pathSegment &&
          child.children.length === 2
        ) {
          // Move to the value node (second child)
          currentNode = child.children[1];
          found = true;
          break;
        }
      }
      if (!found) {
        return;
      }
    } else {
      // pathSegment is a number: expect currentNode to be an array node
      const index = pathSegment;
      if (
        currentNode.type !== "array" ||
        index < 0 ||
        !Array.isArray(currentNode.children) ||
        index >= currentNode.children.length
      ) {
        return;
      }
      currentNode = currentNode.children[index];
    }
  }
  return currentNode;
}

module.exports = traverseNodeByPath;