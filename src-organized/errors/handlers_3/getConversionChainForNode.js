/**
 * Traverses the parent chain of a node in a graph-like structure, accumulating a conversion object
 * by combining conversion data from each ancestor node. The function also records the full ancestry path.
 *
 * @param {string|number} nodeId - The identifier of the starting node.
 * @param {Object} nodeMap - An object mapping node IDs to node data, where each node has a 'parent' property.
 * @returns {Object} The final conversion object for the node, with an added 'conversion' property containing the ancestry path.
 */
function getConversionChainForNode(nodeId, nodeMap) {
  // Initialize ancestry path with the immediate parent and the current node
  const ancestryPath = [nodeMap[nodeId].parent, nodeId];

  // Initialize the conversion object for the current node
  let conversion = $V1[nodeMap[nodeId].parent][nodeId];

  // Start traversing from the immediate parent
  let currentParentId = nodeMap[nodeId].parent;

  // Traverse up the parent chain until a node with no parent is found
  while (nodeMap[currentParentId].parent) {
    // Add the next ancestor to the beginning of the ancestry path
    ancestryPath.unshift(nodeMap[currentParentId].parent);

    // Combine the conversion data from the ancestor node with the current conversion
    conversion = composeFunctions($V1[nodeMap[currentParentId].parent][currentParentId], conversion);

    // Move up to the next ancestor
    currentParentId = nodeMap[currentParentId].parent;
  }

  // Attach the full ancestry path to the conversion object
  conversion.conversion = ancestryPath;

  return conversion;
}

module.exports = getConversionChainForNode;