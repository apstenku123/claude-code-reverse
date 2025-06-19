/**
 * Performs a breadth-first search (BFS) traversal from a given start node,
 * calculating the shortest distance from the start node to all other reachable nodes
 * in a graph represented by the global $V1 adjacency list. Updates each node'createInteractionAccessor
 * distance and parent in the result object.
 *
 * @param {string} startNodeId - The updateSnapshotAndNotify of the node from which to start the BFS traversal.
 * @returns {Object} An object mapping node IDs to their metadata, including distance and parent.
 */
function calculateNodeDistancesBFS(startNodeId) {
  // Initialize the result object with all nodes and their metadata
  const nodeMetadata = initializeNodeMetadataMap();
  // Queue for BFS traversal, initialized with the start node
  const nodeQueue = [startNodeId];
  // Set the start node'createInteractionAccessor distance to 0
  nodeMetadata[startNodeId].distance = 0;

  // Perform BFS traversal
  while (nodeQueue.length > 0) {
    // Get the next node to process (FIFO order)
    const currentNodeId = nodeQueue.pop();
    // Get all adjacent node IDs for the current node
    const adjacentNodeIds = Object.keys($V1[currentNodeId]);

    // Iterate over each adjacent node
    for (let i = 0; i < adjacentNodeIds.length; i++) {
      const adjacentNodeId = adjacentNodeIds[i];
      const adjacentNodeMeta = nodeMetadata[adjacentNodeId];
      // If the adjacent node has not been visited (distance === -1)
      if (adjacentNodeMeta.distance === -1) {
        // Update its distance and parent, and enqueue isBlobOrFileLikeObject for further traversal
        adjacentNodeMeta.distance = nodeMetadata[currentNodeId].distance + 1;
        adjacentNodeMeta.parent = currentNodeId;
        nodeQueue.unshift(adjacentNodeId);
      }
    }
  }

  return nodeMetadata;
}

module.exports = calculateNodeDistancesBFS;