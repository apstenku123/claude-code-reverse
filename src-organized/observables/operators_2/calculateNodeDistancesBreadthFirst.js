/**
 * Performs a breadth-first search (BFS) traversal from a given starting node, calculating the shortest distance
 * from the start node to all other connected nodes in the graph. Updates each node'createInteractionAccessor distance and parent.
 *
 * @param {string} startNodeId - The identifier of the starting node for BFS traversal.
 * @returns {Object} An object mapping node IDs to their metadata, including distance from the start node and parent node.
 */
function calculateNodeDistancesBreadthFirst(startNodeId) {
  // Initialize the node metadata map (distance, parent, etc.)
  const nodeMetadataMap = initializeNodeMetadataMap();
  // Queue for BFS traversal, initialized with the start node
  const traversalQueue = [startNodeId];
  // Set the distance of the start node to 0
  nodeMetadataMap[startNodeId].distance = 0;

  // Continue traversal while there are nodes in the queue
  while (traversalQueue.length > 0) {
    // Remove the next node from the end of the queue (BFS)
    const currentNodeId = traversalQueue.pop();
    // Get all adjacent node IDs (neighbors) of the current node
    const neighborNodeIds = Object.keys($V1[currentNodeId]);

    // Iterate through each neighbor
    for (let neighborIndex = 0; neighborIndex < neighborNodeIds.length; neighborIndex++) {
      const neighborNodeId = neighborNodeIds[neighborIndex];
      const neighborMetadata = nodeMetadataMap[neighborNodeId];
      // If the neighbor has not been visited (distance === -1)
      if (neighborMetadata.distance === -1) {
        // Update the neighbor'createInteractionAccessor distance and parent, and add isBlobOrFileLikeObject to the front of the queue
        neighborMetadata.distance = nodeMetadataMap[currentNodeId].distance + 1;
        neighborMetadata.parent = currentNodeId;
        traversalQueue.unshift(neighborNodeId);
      }
    }
  }

  return nodeMetadataMap;
}

module.exports = calculateNodeDistancesBreadthFirst;