/**
 * Starts a traced transaction if tracing is enabled and the parent span (if required) exists.
 *
 * @param {Object} transactionOptions - Options for starting the transaction.
 * @param {Object} [transactionOptions.scope] - Optional scope object containing the parent span.
 * @param {boolean} [transactionOptions.onlyIfParent] - If true, only start if a parent span exists.
 * @param {boolean} [transactionOptions.forceTransaction] - If true, force starting a transaction.
 * @returns {any} The result of startOrContinueTransactionWithContext(transaction starter) or undefined if not started.
 */
function startTracedTransaction(transactionOptions) {
  // Check if tracing is enabled globally
  if (!EBA.hasTracingEnabled()) return;

  // Extract span context from the transaction options
  const spanContext = convertStartTimeToTimestamp(transactionOptions);

  // Get the current Sentry hub
  const currentHub = kq.getCurrentHub();

  // Determine the parent span: from scope if provided, otherwise from NBA()
  const parentSpan = transactionOptions.scope ? transactionOptions.scope.getSpan() : NBA();

  // If onlyIfParent is set and no parent span exists, do not start a transaction
  if (transactionOptions.onlyIfParent && !parentSpan) return;

  // Clone the scope: use provided scope or get the current scope from ly
  const clonedScope = (transactionOptions.scope || ly.getCurrentScope()).clone();

  // Start the transaction with the provided context and options
  return startOrContinueTransactionWithContext(currentHub, {
    parentSpan: parentSpan,
    spanContext: spanContext,
    forceTransaction: transactionOptions.forceTransaction,
    scope: clonedScope
  });
}

module.exports = startTracedTransaction;