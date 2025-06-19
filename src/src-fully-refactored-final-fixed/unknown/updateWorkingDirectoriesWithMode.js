/**
 * Updates the working directories and mode in the given configuration, then invokes the provided callback with the updated configuration.
 *
 * @param {any} context - The context or source object used for directory resolution and processing.
 * @param {string} actionType - The type of action being performed (e.g., 'edit').
 * @param {Object} config - The configuration object containing mode and additionalWorkingDirectories.
 * @param {Function} updateCallback - Callback function to be called with the updated configuration.
 * @returns {void}
 */
function updateWorkingDirectoriesWithMode(context, actionType, config, updateCallback) {
  // Determine the new mode: use 'acceptEdits' if actionType is 'edit', otherwise keep the current mode
  const newMode = actionType === "edit" ? "acceptEdits" : config.mode;

  // Resolve the directory from the context
  const resolvedDirectory = f3(context);

  // Determine the new set of additional working directories
  // If getProcessedCodePointString returns true, use config.additionalWorkingDirectories as-is
  // Otherwise, add the resolved directory (or its fallback) to the set
  const shouldProcess = nJ(context, config);
  const updatedWorkingDirectories = shouldProcess
    ? config.additionalWorkingDirectories
    : new Set([
        ...config.additionalWorkingDirectories,
        resolveDirectoryOrFallback(resolvedDirectory)
      ]);

  // Call the update callback with the updated configuration
  updateCallback({
    ...config,
    mode: newMode,
    additionalWorkingDirectories: updatedWorkingDirectories
  });
}

module.exports = updateWorkingDirectoriesWithMode;