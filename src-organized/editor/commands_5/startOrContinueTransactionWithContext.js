/**
 * Starts or continues a tracing transaction, handling parent span, sampling context, and propagation context.
 *
 * This function is responsible for starting a new transaction or continuing an existing one based on the provided options.
 * It ensures that tracing is enabled, determines the correct parent context, and attaches dynamic sampling and propagation metadata.
 *
 * @param {object} transactionManager - The object responsible for starting transactions (e.g., Sentry'createInteractionAccessor hub or similar).
 * @param {object} options - Options for transaction creation.
 * @param {object} [options.parentSpan] - An optional parent span to continue from.
 * @param {object} [options.spanContext] - Additional span context to apply to the transaction.
 * @param {boolean} [options.forceTransaction] - If true, forces starting a new transaction even if a parent span exists.
 * @param {object} options.scope - The current scope object, used for propagation context and span management.
 * @returns {object|undefined} The started transaction object, or undefined if tracing is not enabled.
 */
function startOrContinueTransactionWithContext(
  transactionManager,
  {
    parentSpan = undefined,
    spanContext = {},
    forceTransaction = false,
    scope
  }
) {
  // Check if tracing is enabled globally
  if (!EBA.hasTracingEnabled()) return;

  // Get the current isolation scope for propagation context
  const isolationScope = kq.getIsolationScope();
  let transaction;

  // Case 1: There is a parent span and handleMissingDoctypeError are not forcing a new transaction
  if (parentSpan && !forceTransaction) {
    // Start a child span from the parent span using the provided context
    transaction = parentSpan.startChild(spanContext);
  } else if (parentSpan) {
    // Case 2: There is a parent span and handleMissingDoctypeError are forcing a new transaction
    // Extract dynamic sampling context and parent span context
    const dynamicSamplingContext = Vt2.getDynamicSamplingContextFromSpan(parentSpan);
    const {
      traceId,
      spanId: parentSpanId
    } = parentSpan.spanContext();
    const parentSampled = n21.spanIsSampled(parentSpan);

    // Start a new transaction with parent context and dynamic sampling
    transaction = transactionManager.startTransaction({
      traceId,
      parentSpanId,
      parentSampled,
      ...spanContext,
      metadata: {
        dynamicSamplingContext,
        ...spanContext.metadata
      }
    });
  } else {
    // Case 3: No parent span; merge propagation contexts from isolation and scope
    const mergedPropagationContext = {
      ...isolationScope.getPropagationContext(),
      ...scope.getPropagationContext()
    };
    const {
      traceId,
      dsc: dynamicSamplingContext,
      parentSpanId,
      sampled: parentSampled
    } = mergedPropagationContext;

    // Start a new transaction with merged propagation and dynamic sampling context
    transaction = transactionManager.startTransaction({
      traceId,
      parentSpanId,
      parentSampled,
      ...spanContext,
      metadata: {
        dynamicSamplingContext,
        ...spanContext.metadata
      }
    });
  }

  // Set the new transaction as the active span in the current scope
  scope.setSpan(transaction);

  // Perform any additional setup required for the transaction
  attachSubscriptionAndConfigMetadata(transaction, scope, isolationScope);

  // Return the started transaction
  return transaction;
}

module.exports = startOrContinueTransactionWithContext;