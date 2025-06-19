/**
 * Sets up an event listener to automatically cancel the current tracing transaction
 * when the browser tab becomes hidden (i.e., the user switches away from the tab).
 * Logs debug information if enabled, and warns if the global document is unavailable.
 *
 * @returns {void} No return value.
 */
function setupBackgroundTabTransactionCancellation() {
  // Check if the global document object is available
  if (qN1.WINDOW.document) {
    // Add an event listener for when the document'createInteractionAccessor visibility changes
    qN1.WINDOW.document.addEventListener("visibilitychange", () => {
      // Retrieve the currently active tracing transaction
      const activeTransaction = _7A.getActiveTransaction();

      // If the document is now hidden and there is an active transaction
      if (qN1.WINDOW.document.hidden && activeTransaction) {
        // Extract the operation name and status from the transaction
        const {
          op: operationName,
          status: transactionStatus
        } = _7A.spanToJSON(activeTransaction);

        // Log debug information if debug mode is enabled
        if (k7A.DEBUG_BUILD) {
          j7A.logger.log(`[Tracing] Transaction: cancelled -> since tab moved to the background, op: ${operationName}`);
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
    // Warn if the global document object is not available
    j7A.logger.warn("[Tracing] Could not set up background tab detection due to lack of global document");
  }
}

module.exports = setupBackgroundTabTransactionCancellation;