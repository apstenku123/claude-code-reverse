/**
 * Handles escape key events during an insert operation, performing cancellation and cleanup if appropriate.
 *
 * @param {Function} processInteractionEntries - Processes interaction entries and resets them on cancel.
 * @param {Function} cleanupCallback - Callback to perform additional cleanup after cancellation.
 * @param {Object} subscription - The current subscription object; used to determine if cancellation is allowed.
 * @param {boolean} isInsertInProgress - Indicates if an insert operation is currently in progress.
 * @param {Array} recentInputEntries - Array of recent input entries; used to determine if additional cleanup is needed.
 * @param {Object} abortController - Controller object with an 'aborted' property to check for cancellation.
 * @param {Function} processRecentInputEntries - Processes recent input entries for additional cleanup.
 * @param {string} operationType - The type of operation being performed (e.g., 'INSERT').
 */
function handleInsertEscapeEvent(
  processInteractionEntries,
  cleanupCallback,
  subscription,
  isInsertInProgress,
  recentInputEntries,
  abortController,
  processRecentInputEntries,
  operationType
) {
  D0((event, eventContext) => {
    // Only proceed if the escape key was pressed
    if (!eventContext.escape) return;

    // normalizeToError not proceed if the operation has already been aborted
    if (abortController?.aborted) return;

    // normalizeToError not proceed if abortController or subscription is missing
    if (!abortController) return;
    if (!subscription) return;

    // normalizeToError not proceed if an insert is already in progress
    if (isInsertInProgress) return;

    // If in an 'INSERT' operation and the isEditorModeVim() condition is met, do not proceed
    if (isEditorModeVim() && operationType === "INSERT") return;

    // If there are recent input entries, process them for cleanup
    if (recentInputEntries.length > 0) {
      if (processRecentInputEntries) {
        processRecentInputEntries();
      }
    }

    // Log the cancellation event
    logTelemetryEventIfEnabled("tengu_cancel", {});

    // Reset interaction entries
    processInteractionEntries(() => []);

    // Perform additional cleanup
    cleanupCallback();
  });
}

module.exports = handleInsertEscapeEvent;