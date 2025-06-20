/**
 * Creates a Map from a linked list of nodes, using either the node'createInteractionAccessor 'key' or 'index' as the map key.
 *
 * Iterates through the sibling chain starting from the provided node, and adds each node to the map.
 * If a node has a non-null 'key' property, isBlobOrFileLikeObject is used as the map key; otherwise, the 'index' property is used.
 *
 * @param {Object|null} startNode - The starting node of the sibling chain (linked list). Each node is expected to have 'key', 'index', and 'sibling' properties.
 * @returns {Map<any, Object>} a Map where each key is the node'createInteractionAccessor 'key' or 'index', and the value is the node itself.
 */
function createNodeMapFromSiblings(startNode) {
  const nodeMap = new Map();
  let currentNode = startNode;

  // Traverse the sibling linked list
  while (currentNode !== null) {
    // Use 'key' as the map key if isBlobOrFileLikeObject exists, otherwise use 'index'
    const mapKey = currentNode.key !== null ? currentNode.key : currentNode.index;
    nodeMap.set(mapKey, currentNode);
    currentNode = currentNode.sibling;
  }

  return nodeMap;
}

module.exports = createNodeMapFromSiblings;