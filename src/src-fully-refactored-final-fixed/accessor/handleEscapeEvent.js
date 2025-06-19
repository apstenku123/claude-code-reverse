/**
 * Handles escape key events within an accessor context, performing cancellation and cleanup logic.
 *
 * @param {Function} processInteractionEntries - Processes interaction entries and resets them on cancel.
 * @param {Function} cleanupCallback - Callback to perform additional cleanup when escape is triggered.
 * @param {Object} subscription - Represents the current subscription or active process; function exits if falsy.
 * @param {boolean} isInputActive - Indicates if an input is currently active; function exits if true.
 * @param {Array} recentInputEntries - Array of recent input entries; used to determine if additional cleanup is needed.
 * @param {Object} abortController - Contains an 'aborted' property; function exits if aborted.
 * @param {Function} processRecentInputEntries - Processes recent input entries for additional cleanup.
 * @param {string} actionType - The type of action being performed (e.g., 'INSERT'); used to conditionally skip logic.
 */
function handleEscapeEvent(
  processInteractionEntries,
  cleanupCallback,
  subscription,
  isInputActive,
  recentInputEntries,
  abortController,
  processRecentInputEntries,
  actionType
) {
  D0((event, eventContext) => {
    // Only proceed if the escape key was pressed
    if (!eventContext.escape) return;
    // Exit if the operation has already been aborted
    if (abortController?.aborted) return;
    // Exit if abortController is not provided
    if (!abortController) return;
    // Exit if there is no active subscription
    if (!subscription) return;
    // Exit if input is currently active
    if (isInputActive) return;
    // If isEditorModeVim() returns true and actionType is 'INSERT', skip cancellation
    if (isEditorModeVim() && actionType === "INSERT") return;
    // If there are recent input entries, process them for cleanup
    if (recentInputEntries.length > 0) {
      if (processRecentInputEntries) processRecentInputEntries();
    }
    // Log the cancellation event
    logTelemetryEventIfEnabled("tengu_cancel", {});
    // Reset interaction entries
    processInteractionEntries(() => []);
    // Perform additional cleanup
    cleanupCallback();
  });
}

module.exports = handleEscapeEvent;