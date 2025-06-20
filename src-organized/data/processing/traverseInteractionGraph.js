/**
 * Recursively traverses an interaction graph by spawning a process for each node, parsing its output,
 * and building a mapping of interactions. Calls a completion callback when traversal is done.
 *
 * @param {string} nodeId - The current node identifier to process.
 * @param {Object} interactionMap - Maps node IDs to arrays of connected node IDs.
 * @param {Object} pendingNodes - Tracks which nodes are pending processing (nodeId: 1).
 * @param {Function} startProcessForNode - Function to start a process for a node, returns a process object with stdout and 'close' event.
 * @param {Function} onComplete - Callback invoked when all nodes have been processed.
 */
function traverseInteractionGraph(nodeId, interactionMap, pendingNodes, startProcessForNode, onComplete) {
  // Start a process for the current node
  const process = startProcessForNode(nodeId);
  let outputBuffer = "";

  // Collect stdout data as ASCII string
  process.stdout.on("data", (chunk) => {
    outputBuffer += chunk.toString("ascii");
  });

  /**
   * Handler for process close event.
   * @param {number} exitCode - The exit code of the process.
   */
  const handleProcessClose = (exitCode) => {
    // Remove the current node from pendingNodes
    delete pendingNodes[nodeId];

    // If process exited with error, check if all nodes are done
    if (exitCode !== 0) {
      if (Object.keys(pendingNodes).length === 0) {
        onComplete();
      }
      return;
    }

    // Parse all numbers from the output (expected to be node IDs)
    const matchedNodeIds = outputBuffer.match(/\d+/g);
    if (matchedNodeIds) {
      matchedNodeIds.forEach((matchedId) => {
        const childNodeId = parseInt(matchedId, 10);
        // Add child node to the current node'createInteractionAccessor adjacency list
        interactionMap[nodeId].push(childNodeId);
        // Initialize adjacency list for the child node if not present
        interactionMap[childNodeId] = interactionMap[childNodeId] || [];
        // Mark child node as pending
        pendingNodes[childNodeId] = 1;
        // Recursively process the child node
        traverseInteractionGraph(childNodeId, interactionMap, pendingNodes, startProcessForNode, onComplete);
      });
    }
  };

  // Listen for process close event
  process.on("close", handleProcessClose);
}

module.exports = traverseInteractionGraph;
