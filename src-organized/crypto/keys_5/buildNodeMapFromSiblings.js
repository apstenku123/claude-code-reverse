/**
 * Builds a Map from a linked list of sibling nodes, using either the 'key' or 'index' property as the map key.
 *
 * @param {null} _unusedMapParam - (Unused) Placeholder for the initial Map, always ignored and replaced internally.
 * @param {Object|null} firstSiblingNode - The head node of the sibling linked list. Each node should have 'key', 'index', and 'sibling' properties.
 * @returns {Map} a Map where each entry'createInteractionAccessor key is the node'createInteractionAccessor 'key' (if not null) or 'index', and the value is the node itself.
 */
function buildNodeMapFromSiblings(_unusedMapParam, firstSiblingNode) {
  const nodeMap = new Map();
  let currentNode = firstSiblingNode;

  // Traverse the sibling linked list
  while (currentNode !== null) {
    // Use 'key' as the map key if isBlobOrFileLikeObject exists, otherwise use 'index'
    const mapKey = currentNode.key !== null ? currentNode.key : currentNode.index;
    nodeMap.set(mapKey, currentNode);
    currentNode = currentNode.sibling;
  }

  return nodeMap;
}

module.exports = buildNodeMapFromSiblings;