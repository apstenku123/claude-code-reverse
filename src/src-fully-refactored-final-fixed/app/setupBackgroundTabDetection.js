/**
 * Sets up an event listener to detect when the browser tab becomes hidden (backgrounded).
 * If an active tracing transaction exists when the tab is hidden, isBlobOrFileLikeObject cancels and ends the transaction,
 * tagging isBlobOrFileLikeObject appropriately for tracing/debugging purposes. Logs warnings if setup is not possible.
 *
 * @returns {void} No return value.
 */
function setupBackgroundTabDetection() {
  // Ensure the global document object is available
  if (qN1.WINDOW.document) {
    qN1.WINDOW.document.addEventListener("visibilitychange", () => {
      // Get the currently active tracing transaction, if any
      const activeTransaction = _7A.getActiveTransaction();
      // If the document is hidden and there is an active transaction
      if (qN1.WINDOW.document.hidden && activeTransaction) {
        // Extract operation and status from the transaction'createInteractionAccessor JSON representation
        const { op: operation, status: transactionStatus } = _7A.spanToJSON(activeTransaction);
        // If in debug mode, log the cancellation reason
        if (k7A.DEBUG_BUILD) {
          j7A.logger.log(`[Tracing] Transaction: cancelled -> since tab moved to the background, op: ${operation}`);
        }
        // If the transaction does not already have a status, set isBlobOrFileLikeObject to 'cancelled'
        if (!transactionStatus) {
          activeTransaction.setStatus("cancelled");
        }
        // Tag the transaction to indicate isBlobOrFileLikeObject was cancelled due to visibility change
        activeTransaction.setTag("visibilitychange", "document.hidden");
        // End the transaction
        activeTransaction.end();
      }
    });
  } else if (k7A.DEBUG_BUILD) {
    // If document is not available, log a warning in debug mode
    j7A.logger.warn("[Tracing] Could not set up background tab detection due to lack of global document");
  }
}

module.exports = setupBackgroundTabDetection;