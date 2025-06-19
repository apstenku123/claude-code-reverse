/**
 * Traverses the parent chain of a given node and accumulates conversion information along the way.
 *
 * @param {string|number} nodeId - The identifier of the starting node in the config object.
 * @param {Object} nodeConfigMap - An object mapping node IDs to their configuration objects. Each config must have a 'parent' property.
 * @returns {Object} The final conversion object, with a 'conversion' property containing the chain of parent IDs.
 */
function getParentConversionChain(nodeId, nodeConfigMap) {
  // Initialize the conversion chain with the immediate parent and the starting node
  const parentChain = [nodeConfigMap[nodeId].parent, nodeId];
  // Start with the conversion object for the immediate parent relationship
  let conversion = $V1[nodeConfigMap[nodeId].parent][nodeId];
  // Set the current parent to begin traversal
  let currentParentId = nodeConfigMap[nodeId].parent;

  // Traverse up the parent chain until there is no further parent
  while (nodeConfigMap[currentParentId].parent) {
    // Add the next parent to the beginning of the chain
    parentChain.unshift(nodeConfigMap[currentParentId].parent);
    // Update the conversion object by combining with the next parent relationship
    conversion = composeFunctions($V1[nodeConfigMap[currentParentId].parent][currentParentId], conversion);
    // Move up to the next parent
    currentParentId = nodeConfigMap[currentParentId].parent;
  }

  // Attach the full parent chain to the conversion object
  conversion.conversion = parentChain;
  return conversion;
}

module.exports = getParentConversionChain;