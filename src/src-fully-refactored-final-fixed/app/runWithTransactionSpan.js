/**
 * Executes a callback within a new transaction span, handling errors and cleanup.
 *
 * This function creates a new transaction span based on the provided source context,
 * executes the provided callback with the span, and ensures proper error handling
 * and cleanup. It also allows for custom error and completion handlers.
 *
 * @param {any} sourceContext - The context or data used to create the span context.
 * @param {function} transactionCallback - The main callback to execute within the transaction span. Receives the span as an argument.
 * @param {function} [onError=() => {}] - Optional error handler. Receives the error and the span as arguments.
 * @param {function} [onComplete=() => {}] - Optional completion handler, called after the transaction ends.
 * @returns {any} The result of the transactionCallback, or whatever is returned by handleCallbackErrors.
 */
function runWithTransactionSpan(
  sourceContext,
  transactionCallback,
  onError = () => {},
  onComplete = () => {}
) {
  // Get the current Sentry hub and scope
  const currentHub = kq.getCurrentHub();
  const currentScope = ly.getCurrentScope();

  // Get the current active span (if any)
  const previousSpan = currentScope.getSpan();

  // Extract span context from the source context
  const spanContext = convertStartTimeToTimestamp(sourceContext);

  // Create a new span for this transaction
  const transactionSpan = startOrContinueTransactionWithContext(currentHub, {
    parentSpan: previousSpan,
    spanContext: spanContext,
    forceTransaction: false,
    scope: currentScope
  });

  // Set the new span as the active span in the current scope
  currentScope.setSpan(transactionSpan);

  // Execute the callback with error and completion handling
  return hU1.handleCallbackErrors(
    () => transactionCallback(transactionSpan),
    (error) => {
      // On error, set the span status and call the error handler
      if (transactionSpan) {
        transactionSpan.setStatus("internal_error");
      }
      onError(error, transactionSpan);
    },
    () => {
      // On completion, end the span, restore the previous span, and call the completion handler
      if (transactionSpan) {
        transactionSpan.end();
      }
      currentScope.setSpan(previousSpan);
      onComplete();
    }
  );
}

module.exports = runWithTransactionSpan;