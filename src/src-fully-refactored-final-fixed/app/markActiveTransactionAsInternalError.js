/**
 * Marks the currently active transaction with an 'internal_error' status if one exists.
 * Optionally logs a debug message if DEBUG_BUILD is enabled.
 *
 * @returns {void} Does not return a value.
 */
function markActiveTransactionAsInternalError() {
  // Retrieve the currently active transaction from the global transaction manager
  const activeTransaction = oo2.getActiveTransaction();

  if (activeTransaction) {
    // If debug mode is enabled, log the internal error event
    if (ro2.DEBUG_BUILD) {
      xU1.logger.log("[Tracing] Transaction: internal_error -> Global error occured");
    }
    // Set the transaction status to 'internal_error'
    activeTransaction.setStatus("internal_error");
  }
}

module.exports = markActiveTransactionAsInternalError;