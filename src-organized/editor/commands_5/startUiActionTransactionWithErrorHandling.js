/**
 * Starts a UI action transaction with error handling and proper span management.
 *
 * This function sets up a Sentry transaction for a UI action, executes the provided action callback,
 * and ensures errors and cleanup are handled via the provided error and completion callbacks.
 *
 * @param {any} transactionContext - Context or observable used to create the transaction'createInteractionAccessor span context.
 * @param {Function} actionCallback - Function to execute within the transaction span. Receives the transaction span as an argument.
 * @param {Function} [onError=() => {}] - Callback invoked if an error occurs. Receives the error and the transaction span.
 * @param {Function} [onComplete=() => {}] - Callback invoked after transaction completion and cleanup.
 * @returns {any} The result of the actionCallback, or whatever hU1.handleCallbackErrors returns.
 */
function startUiActionTransactionWithErrorHandling(
  transactionContext,
  actionCallback,
  onError = () => {},
  onComplete = () => {}
) {
  // Get the current Sentry hub and scope
  const currentHub = kq.getCurrentHub();
  const currentScope = ly.getCurrentScope();

  // Get the current active span (if any)
  const previousSpan = currentScope.getSpan();

  // Create a span context from the provided transaction context
  const spanContext = convertStartTimeToTimestamp(transactionContext);

  // Start a new transaction span as a child of the previous span
  const transactionSpan = startOrContinueTransactionWithContext(currentHub, {
    parentSpan: previousSpan,
    spanContext: spanContext,
    forceTransaction: false,
    scope: currentScope
  });

  // Set the new transaction span as the active span in the scope
  currentScope.setSpan(transactionSpan);

  // Execute the action callback with error and completion handling
  return hU1.handleCallbackErrors(
    () => actionCallback(transactionSpan),
    error => {
      // On error, set the transaction status and invoke the error callback
      if (transactionSpan) {
        transactionSpan.setStatus("internal_error");
      }
      onError(error, transactionSpan);
    },
    () => {
      // On completion, end the transaction, restore the previous span, and invoke the completion callback
      if (transactionSpan) {
        transactionSpan.end();
      }
      currentScope.setSpan(previousSpan);
      onComplete();
    }
  );
}

module.exports = startUiActionTransactionWithErrorHandling;