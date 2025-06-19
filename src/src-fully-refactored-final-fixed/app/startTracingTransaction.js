/**
 * Starts a tracing transaction if tracing is enabled and the parent span conditions are met.
 *
 * @param {Object} options - Configuration options for starting the transaction.
 * @param {Object} [options.scope] - Optional scope object that may contain a parent span.
 * @param {boolean} [options.onlyIfParent] - If true, only start if a parent span exists.
 * @param {boolean} [options.forceTransaction] - If true, force starting a transaction.
 * @returns {any} The result of the transaction starter function, or undefined if not started.
 */
function startTracingTransaction(options) {
  // Check if tracing is enabled globally
  if (!EBA.hasTracingEnabled()) return;

  // Extract span context from options
  const spanContext = convertStartTimeToTimestamp(options);

  // Get the current Sentry hub
  const currentHub = kq.getCurrentHub();

  // Determine the parent span: from scope if provided, otherwise use NBA()
  const parentSpan = options.scope ? options.scope.getSpan() : NBA();

  // If onlyIfParent is true and no parent span exists, do not proceed
  if (options.onlyIfParent && !parentSpan) return;

  // Clone the current scope: use provided scope or get the current one
  const clonedScope = (options.scope || ly.getCurrentScope()).clone();

  // Start the transaction with the prepared context
  return startOrContinueTransactionWithContext(currentHub, {
    parentSpan: parentSpan,
    spanContext: spanContext,
    forceTransaction: options.forceTransaction,
    scope: clonedScope
  });
}

module.exports = startTracingTransaction;