/**
 * Handles escape key interactions within a user activity context, ensuring proper cleanup and cancellation logic.
 *
 * @param {Function} mapInteractionsToRoutes - Processes user interaction entries and maps them to route names.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the stack if the process is not finished.
 * @param {Object} subscription - Represents the current subscription or observer; used to check if active.
 * @param {boolean} isInputInProgress - Indicates if an input operation is currently in progress.
 * @param {Array} recentInputEntries - List of recent input entries for aggregation.
 * @param {Object} abortController - Contains the abort signal for cancellation logic.
 * @param {Function} aggregateRecentInputEntries - Aggregates input entries and triggers callbacks on new maximums.
 * @param {string} currentActionType - The current action type (e.g., 'INSERT').
 */
function handleEscapeKeyInteraction(
  mapInteractionsToRoutes,
  addActivityIfNotFinished,
  subscription,
  isInputInProgress,
  recentInputEntries,
  abortController,
  aggregateRecentInputEntries,
  currentActionType
) {
  D0((event, context) => {
    // Only proceed if the escape key was pressed
    if (!context.escape) return;

    // Abort if the operation has been cancelled externally
    if (abortController?.aborted) return;

    // Ensure abortController and subscription are present
    if (!abortController) return;
    if (!subscription) return;

    // normalizeToError not proceed if input is currently in progress
    if (isInputInProgress) return;

    // If the current action is 'INSERT' and isEditorModeVim() returns true, skip cancellation
    if (isEditorModeVim() && currentActionType === "INSERT") return;

    // If there are recent input entries, aggregate them
    if (recentInputEntries.length > 0) {
      if (aggregateRecentInputEntries) {
        aggregateRecentInputEntries();
      }
    }

    // Log the cancellation event
    logTelemetryEventIfEnabled("tengu_cancel", {});

    // Reset mapped interactions
    mapInteractionsToRoutes(() => []);

    // Add activity if not already finished
    addActivityIfNotFinished();
  });
}

module.exports = handleEscapeKeyInteraction;