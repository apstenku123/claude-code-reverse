/**
 * Executes an activity within a transaction context, handling errors and cleanup.
 *
 * This function retrieves the current hub and scope, creates a new transaction span
 * based on the provided source observable, and executes the activity callback within
 * this context. It ensures proper error handling and cleanup, invoking the provided
 * error and completion callbacks as appropriate.
 *
 * @param {any} sourceObservable - The source observable or context for the transaction.
 * @param {function} activityCallback - The main activity to execute, receives the transaction span as an argument.
 * @param {function} [onErrorCallback=() => {}] - Callback invoked if an error occurs, receives the error and transaction span.
 * @param {function} [onCompleteCallback=() => {}] - Callback invoked after the activity completes, for cleanup.
 * @returns {any} The result of the activityCallback, or the error handler if an error occurs.
 */
function runActivityWithTransactionContext(
  sourceObservable,
  activityCallback,
  onErrorCallback = () => {},
  onCompleteCallback = () => {}
) {
  // Retrieve the current Sentry hub and scope
  const currentHub = kq.getCurrentHub();
  const currentScope = ly.getCurrentScope();

  // Get the current active span from the scope
  const parentSpan = currentScope.getSpan();

  // Extract span context from the source observable
  const spanContext = convertStartTimeToTimestamp(sourceObservable);

  // Create a new transaction span with the extracted context
  const transactionSpan = startOrContinueTransactionWithContext(currentHub, {
    parentSpan: parentSpan,
    spanContext: spanContext,
    forceTransaction: false,
    scope: currentScope
  });

  // Set the new transaction span as the active span in the scope
  currentScope.setSpan(transactionSpan);

  // Execute the activity callback with error and completion handling
  return hU1.handleCallbackErrors(
    () => activityCallback(transactionSpan),
    (error) => {
      // On error, set the span status and invoke the error callback
      if (transactionSpan) {
        transactionSpan.setStatus("internal_error");
      }
      onErrorCallback(error, transactionSpan);
    },
    () => {
      // On completion, end the span, restore the previous span, and invoke the completion callback
      if (transactionSpan) {
        transactionSpan.end();
      }
      currentScope.setSpan(parentSpan);
      onCompleteCallback();
    }
  );
}

module.exports = runActivityWithTransactionContext;