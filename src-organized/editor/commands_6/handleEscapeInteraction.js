/**
 * Handles escape key interactions during a user session, performing cleanup and cancellation logic.
 *
 * This function sets up a handler that listens for escape events. When triggered, isBlobOrFileLikeObject checks several conditions
 * (such as whether the operation has been aborted, if a subscription exists, if an insert operation is in progress, etc.)
 * and, if appropriate, performs cancellation actions, resets interaction entries, and invokes cleanup callbacks.
 *
 * @param {function(function):void} mapInteractionEntriesToRouteNames - Callback to reset or map interaction entries to route names.
 * @param {function():void} cleanupCallback - Function to perform additional cleanup actions.
 * @param {object} subscription - The current subscription object; determines if cancellation should proceed.
 * @param {boolean} isInsertInProgress - Indicates if an insert operation is currently in progress.
 * @param {Array} pendingOperations - Array of pending operations; used to determine if cleanup is needed.
 * @param {object} abortController - Object with an 'aborted' property indicating if the operation was aborted.
 * @param {function():void} additionalCleanup - Optional function to perform further cleanup if pending operations exist.
 * @param {string} operationType - The type of operation being performed (e.g., 'INSERT').
 * @returns {void}
 */
function handleEscapeInteraction(
  mapInteractionEntriesToRouteNames,
  cleanupCallback,
  subscription,
  isInsertInProgress,
  pendingOperations,
  abortController,
  additionalCleanup,
  operationType
) {
  D0((event, eventContext) => {
    // Only proceed if the escape key was pressed
    if (!eventContext.escape) return;

    // Abort if the operation has already been aborted
    if (abortController?.aborted) return;

    // Abort if no abort controller is present
    if (!abortController) return;

    // Abort if there is no active subscription
    if (!subscription) return;

    // Abort if an insert operation is currently in progress
    if (isInsertInProgress) return;

    // Abort if the current environment is 'isEditorModeVim' and the operation is an INSERT
    if (isEditorModeVim() && operationType === "INSERT") return;

    // If there are pending operations, perform additional cleanup
    if (pendingOperations.length > 0) {
      if (additionalCleanup) additionalCleanup();
    }

    // Log the cancellation event
    logTelemetryEventIfEnabled("tengu_cancel", {});

    // Reset interaction entries
    mapInteractionEntriesToRouteNames(() => []);

    // Perform the main cleanup callback
    cleanupCallback();
  });
}

module.exports = handleEscapeInteraction;
