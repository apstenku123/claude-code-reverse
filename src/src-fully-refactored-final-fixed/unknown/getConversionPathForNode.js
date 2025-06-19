/**
 * Traverses the parent chain of a node and accumulates conversion data along the path.
 *
 * @param {string|number} nodeId - The identifier of the starting node.
 * @param {Object} nodeMap - An object mapping node IDs to node data, where each node has a 'parent' property.
 * @returns {Object} The final conversion object with an added 'conversion' property containing the path from root to the node.
 */
function getConversionPathForNode(nodeId, nodeMap) {
  // Initialize the conversion path with the parent of the starting node and the node itself
  const conversionPath = [nodeMap[nodeId].parent, nodeId];
  // Get the initial conversion object from the $V1 structure
  let conversion = $V1[nodeMap[nodeId].parent][nodeId];
  // Start traversal from the parent of the starting node
  let currentNodeId = nodeMap[nodeId].parent;

  // Traverse up the parent chain until reaching a node with no parent
  while (nodeMap[currentNodeId].parent) {
    // Add the next parent to the beginning of the conversion path
    conversionPath.unshift(nodeMap[currentNodeId].parent);
    // Update the conversion object by combining with the parent'createInteractionAccessor conversion data
    conversion = composeFunctions($V1[nodeMap[currentNodeId].parent][currentNodeId], conversion);
    // Move up to the next parent
    currentNodeId = nodeMap[currentNodeId].parent;
  }

  // Attach the full conversion path to the conversion object
  conversion.conversion = conversionPath;
  return conversion;
}

module.exports = getConversionPathForNode;