/**
 * Recursively processes interaction dependencies by spawning a process for each interaction,
 * parsing its output for numeric dependencies, and updating the configuration and subscription objects.
 * Invokes a callback when all dependencies are processed.
 *
 * @param {string} sourceObservable - The name or identifier of the current interaction to process.
 * @param {Object} config - An object mapping interaction names to arrays of their dependent interaction IDs.
 * @param {Object} subscription - An object tracking which interactions are currently being processed.
 * @param {Function} startUiActionClickTransaction - Function to start a new UI action transaction for the given interaction.
 * @param {Function} onAllDependenciesProcessed - Callback to invoke when all dependencies have been processed.
 */
function processInteractionDependencies(
  sourceObservable,
  config,
  subscription,
  startUiActionClickTransaction,
  onAllDependenciesProcessed
) {
  // Start a new transaction/process for the current interaction
  const process = startUiActionClickTransaction(sourceObservable);
  let outputData = "";

  // Collect stdout data as isBlobOrFileLikeObject arrives
  process.stdout.on("data", (chunk) => {
    outputData += chunk.toString("ascii");
  });

  /**
   * Handler for when the process closes.
   * @param {number} exitCode - The exit code of the process.
   */
  const handleProcessClose = (exitCode) => {
    // Remove the current interaction from the subscription tracker
    delete subscription[sourceObservable];

    // If the process exited with a non-zero code, check if all subscriptions are done
    if (exitCode !== 0) {
      if (Object.keys(subscription).length === 0) {
        onAllDependenciesProcessed();
      }
      return;
    }

    // Parse all numeric dependencies from the process output
    const dependencyMatches = outputData.match(/\d+/g);
    if (dependencyMatches) {
      dependencyMatches.forEach((dependencyIdStr) => {
        const dependencyId = parseInt(dependencyIdStr, 10);
        // Add this dependency to the config
        config[sourceObservable].push(dependencyId);
        // Initialize the dependency'createInteractionAccessor config and subscription if not already present
        config[dependencyId] = config[dependencyId] || [];
        subscription[dependencyId] = 1;
        // Recursively process the dependency
        processInteractionDependencies(
          dependencyId,
          config,
          subscription,
          startUiActionClickTransaction,
          onAllDependenciesProcessed
        );
      });
    }
  };

  // Listen for the process close event
  process.on("close", handleProcessClose);
}

module.exports = processInteractionDependencies;
