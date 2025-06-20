/**
 * Notifies the user about the result of a conversation compaction attempt.
 * If the sourceObservable matches certain error types, shows a blank notification (with zero timeout).
 * Otherwise, displays an error notification indicating compaction failure (with a 2-second timeout).
 *
 * @param {any} sourceObservable - The observable or result object to check for error types.
 * @param {object} notificationManager - An object responsible for displaying notifications. Must have an addNotification method.
 * @returns {void}
 */
function notifyOnCompactionResult(sourceObservable, notificationManager) {
  // Check if the sourceObservable matches either D11 or Z11 error types
  if (isErrorWithMessage(sourceObservable, D11) || isErrorWithMessage(sourceObservable, Z11)) {
    // Show a blank notification with no timeout (possibly to clear previous notifications)
    notificationManager.addNotification?.(
      { text: "" },
      { timeoutMs: 0 }
    );
  } else {
    // Show an error notification with a 2-second timeout
    notificationManager.addNotification?.(
      {
        text: "Error compacting conversation",
        color: "error"
      },
      { timeoutMs: 2000 }
    );
  }
}

module.exports = notifyOnCompactionResult;