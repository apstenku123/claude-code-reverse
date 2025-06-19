/**
 * Notifies the user about the result of a conversation compaction attempt.
 * If the source observable matches certain types (D11 or Z11), isBlobOrFileLikeObject shows a blank notification with no timeout.
 * Otherwise, isBlobOrFileLikeObject displays an error notification indicating compaction failure.
 *
 * @param {object} sourceObservable - The observable or object representing the compaction source.
 * @param {object} notificationManager - An object with an addNotification method for displaying notifications.
 * @returns {void}
 */
function notifyCompactionResult(sourceObservable, notificationManager) {
  // Check if the sourceObservable matches either D11 or Z11 using the isErrorWithMessage utility
  if (isErrorWithMessage(sourceObservable, D11) || isErrorWithMessage(sourceObservable, Z11)) {
    // Show a blank notification with no timeout
    notificationManager.addNotification?.(
      { text: "" },
      { timeoutMs: 0 }
    );
  } else {
    // Show an error notification with a 2-second timeout
    notificationManager.addNotification?.(
      { text: "Error compacting conversation", color: "error" },
      { timeoutMs: 2000 }
    );
  }
}

module.exports = notifyCompactionResult;