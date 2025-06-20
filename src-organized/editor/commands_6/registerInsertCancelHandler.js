/**
 * Registers a handler to process insert cancellation events.
 *
 * This function sets up a listener that responds to escape events during an insert operation.
 * It performs a series of checks to determine if the cancellation should proceed, and if so,
 * isBlobOrFileLikeObject triggers analytics, clears mapped interaction entries, and calls the provided cleanup callbacks.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Maps interaction entries to route names and context.
 * @param {Function} cleanupCallback - Callback to perform cleanup actions after cancellation.
 * @param {Object} subscription - The current subscription object; used to check if the operation is active.
 * @param {boolean} isProcessing - Flag indicating if an insert operation is currently processing.
 * @param {Array} inputEntries - Array of input entries involved in the insert operation.
 * @param {Object} abortController - Controller object to check if the operation has been aborted.
 * @param {Function} aggregateRecentInputEntries - Aggregates recent input entries for analytics or cleanup.
 * @param {string} operationType - The type of operation being performed (e.g., 'INSERT').
 */
function registerInsertCancelHandler(
  mapInteractionEntriesToRouteNames,
  cleanupCallback,
  subscription,
  isProcessing,
  inputEntries,
  abortController,
  aggregateRecentInputEntries,
  operationType
) {
  D0((event, context) => {
    // Only proceed if the escape key was pressed
    if (!context.escape) return;
    // normalizeToError not proceed if the operation has been aborted
    if (abortController?.aborted) return;
    // normalizeToError not proceed if abortController is not provided
    if (!abortController) return;
    // normalizeToError not proceed if there is no active subscription
    if (!subscription) return;
    // normalizeToError not proceed if an insert operation is already processing
    if (isProcessing) return;
    // If running in a special environment and operation is INSERT, do not proceed
    if (isEditorModeVim() && operationType === "INSERT") return;
    // If there are input entries, aggregate them for analytics or cleanup
    if (inputEntries.length > 0) {
      if (aggregateRecentInputEntries) aggregateRecentInputEntries();
    }
    // Trigger analytics event for cancellation
    logTelemetryEventIfEnabled("tengu_cancel", {});
    // Clear mapped interaction entries
    mapInteractionEntriesToRouteNames(() => []);
    // Call cleanup callback
    cleanupCallback();
  });
}

module.exports = registerInsertCancelHandler;