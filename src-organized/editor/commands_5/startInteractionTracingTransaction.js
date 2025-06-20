/**
 * Starts a tracing transaction for a user interaction if tracing is enabled and the appropriate parent span exists.
 *
 * @param {Object} interactionOptions - Options for starting the tracing transaction.
 * @param {Object} [interactionOptions.scope] - Optional scope object that may contain the parent span.
 * @param {boolean} [interactionOptions.onlyIfParent] - If true, only start if a parent span exists.
 * @param {boolean} [interactionOptions.forceTransaction] - If true, force the creation of a transaction.
 * @returns {any} The result of the transaction starter function, or undefined if tracing is not enabled or parent span is missing.
 */
function startInteractionTracingTransaction(interactionOptions) {
  // Check if tracing is enabled globally
  if (!EBA.hasTracingEnabled()) {
    return;
  }

  // Extract span context from the interaction options
  const spanContext = convertStartTimeToTimestamp(interactionOptions);

  // Get the current tracing hub
  const currentHub = kq.getCurrentHub();

  // Determine the parent span: either from the provided scope or fallback
  const parentSpan = interactionOptions.scope
    ? interactionOptions.scope.getSpan()
    : NBA();

  // If onlyIfParent is set and no parent span exists, do not proceed
  if (interactionOptions.onlyIfParent && !parentSpan) {
    return;
  }

  // Clone the current or provided scope for isolation
  const clonedScope = (interactionOptions.scope || ly.getCurrentScope()).clone();

  // Start the transaction with the prepared context
  return startOrContinueTransactionWithContext(currentHub, {
    parentSpan: parentSpan,
    spanContext: spanContext,
    forceTransaction: interactionOptions.forceTransaction,
    scope: clonedScope
  });
}

module.exports = startInteractionTracingTransaction;