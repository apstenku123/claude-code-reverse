/**
 * Handles escape key events during user input aggregation, performing cleanup and cancellation logic.
 *
 * This function sets up an event listener for escape events. When an escape event is detected,
 * and a series of guard conditions are met (such as not being aborted, not in insert mode, etc.),
 * isBlobOrFileLikeObject optionally aggregates recent input entries, cancels the current operation, clears mapped interactions,
 * and adds an activity if not already finished.
 *
 * @param {Function} mapInteractionsToRouteNames - Processes user interaction entries and maps them to route names and context.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the stack if the process is not finished.
 * @param {Object} subscription - The current subscription object; used to check if the process is active.
 * @param {boolean} isInProgress - Indicates if an operation is currently in progress.
 * @param {Array} recentInputEntries - Array of recent user input entries.
 * @param {Object} abortController - Controller object with an 'aborted' property for cancellation.
 * @param {Function} [aggregateRecentInputEntries] - Optional function to aggregate input entries into windows.
 * @param {string} currentMode - The current mode of operation (e.g., 'INSERT').
 */
function handleEscapeEventWithInputAggregation(
  mapInteractionsToRouteNames,
  addActivityIfNotFinished,
  subscription,
  isInProgress,
  recentInputEntries,
  abortController,
  aggregateRecentInputEntries,
  currentMode
) {
  D0((event, eventContext) => {
    // Only proceed if the event is an escape key event
    if (!eventContext.escape) return;

    // Abort if already cancelled
    if (abortController?.aborted) return;

    // Ensure abortController and subscription are present
    if (!abortController) return;
    if (!subscription) return;

    // normalizeToError not proceed if an operation is already in progress
    if (isInProgress) return;

    // If in insert mode and running in a specific environment, do not proceed
    if (isEditorModeVim() && currentMode === "INSERT") return;

    // If there are recent input entries, aggregate them if the function is provided
    if (recentInputEntries.length > 0) {
      if (aggregateRecentInputEntries) {
        aggregateRecentInputEntries();
      }
    }

    // Trigger cancellation event
    logTelemetryEventIfEnabled("tengu_cancel", {});

    // Clear mapped interactions
    mapInteractionsToRouteNames(() => []);

    // Add activity if not already finished
    addActivityIfNotFinished();
  });
}

module.exports = handleEscapeEventWithInputAggregation;