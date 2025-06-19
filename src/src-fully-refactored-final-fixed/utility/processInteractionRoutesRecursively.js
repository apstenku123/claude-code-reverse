/**
 * Recursively processes user interaction routes by starting UI action transactions,
 * collecting and parsing output for route IDs, updating configuration and subscription objects,
 * and invoking a callback when all processing is complete.
 *
 * @param {string} sourceRouteId - The current route updateSnapshotAndNotify to process.
 * @param {Object} routeConfig - An object mapping route IDs to arrays of child route IDs.
 * @param {Object} activeSubscriptions - An object tracking which route IDs are currently being processed.
 * @param {Function} startUiActionClickTransaction - Function to start a UI action click transaction for a route updateSnapshotAndNotify.
 * @param {Function} onComplete - Callback to invoke when all routes have been processed.
 */
function processInteractionRoutesRecursively(
  sourceRouteId,
  routeConfig,
  activeSubscriptions,
  startUiActionClickTransaction,
  onComplete
) {
  // Start the UI action click transaction for the current route
  const transactionProcess = startUiActionClickTransaction(sourceRouteId);
  let outputData = "";

  // Collect output data from the transaction process
  transactionProcess.stdout.on("data", (chunk) => {
    const asciiChunk = chunk.toString("ascii");
    outputData += asciiChunk;
  });

  /**
   * Handler for when the transaction process closes.
   * @param {number} exitCode - The exit code of the process.
   */
  const handleProcessClose = (exitCode) => {
    // Remove the current route from active subscriptions
    delete activeSubscriptions[sourceRouteId];

    // If the process did not exit successfully, check if all subscriptions are done
    if (exitCode !== 0) {
      if (Object.keys(activeSubscriptions).length === 0) {
        onComplete();
      }
      return;
    }

    // Parse all numeric route IDs from the output data
    const matchedRouteIds = outputData.match(/\d+/g);
    if (matchedRouteIds) {
      matchedRouteIds.forEach((routeIdString) => {
        const childRouteId = parseInt(routeIdString, 10);
        // Add the child route updateSnapshotAndNotify to the current route'createInteractionAccessor config
        routeConfig[sourceRouteId].push(childRouteId);
        // Initialize the child route'createInteractionAccessor config and subscription
        routeConfig[childRouteId] = [];
        activeSubscriptions[childRouteId] = 1;
        // Recursively process the child route
        processInteractionRoutesRecursively(
          childRouteId,
          routeConfig,
          activeSubscriptions,
          startUiActionClickTransaction,
          onComplete
        );
      });
    }
  };

  // Listen for the process close event
  transactionProcess.on("close", handleProcessClose);
}

module.exports = processInteractionRoutesRecursively;
