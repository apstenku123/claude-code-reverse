/**
 * Starts or continues a tracing transaction based on the provided context.
 * Handles parent span, dynamic sampling context, and propagation context merging.
 *
 * @param {Object} tracingApi - The tracing API object with startTransaction method.
 * @param {Object} options - Options for transaction creation.
 * @param {Object} [options.parentSpan] - Optional parent span to continue from.
 * @param {Object} [options.spanContext] - Optional span context to override or extend.
 * @param {boolean} [options.forceTransaction] - If true, forces a new transaction even if parentSpan exists.
 * @param {Object} options.scope - The current scope object for propagation and span management.
 * @returns {Object|undefined} The started transaction span, or undefined if tracing is disabled.
 */
function startOrContinueTracingTransaction(tracingApi, {
  parentSpan = undefined,
  spanContext = {},
  forceTransaction = false,
  scope
}) {
  // Check if tracing is enabled globally
  if (!EBA.hasTracingEnabled()) return;

  // Get the current isolation scope for propagation context
  const isolationScope = kq.getIsolationScope();
  let transactionSpan;

  if (parentSpan && !forceTransaction) {
    // If a parent span exists and handleMissingDoctypeError're not forcing a new transaction,
    // start a child span from the parent
    transactionSpan = parentSpan.startChild(spanContext);
  } else if (parentSpan) {
    // If a parent span exists but handleMissingDoctypeError're forcing a new transaction,
    // extract dynamic sampling context and parent context
    const dynamicSamplingContext = Vt2.getDynamicSamplingContextFromSpan(parentSpan);
    const { traceId, spanId: parentSpanId } = parentSpan.spanContext();
    const parentSampled = n21.spanIsSampled(parentSpan);

    transactionSpan = tracingApi.startTransaction({
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
    // No parent span: merge propagation contexts from isolation scope and current scope
    const {
      traceId,
      dsc: dynamicSamplingContext,
      parentSpanId,
      sampled: parentSampled
    } = {
      ...isolationScope.getPropagationContext(),
      ...scope.getPropagationContext()
    };

    transactionSpan = tracingApi.startTransaction({
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

  // Set the new span in the current scope
  scope.setSpan(transactionSpan);
  // Perform additional setup with the transaction, scope, and isolation scope
  attachSubscriptionAndConfigMetadata(transactionSpan, scope, isolationScope);

  return transactionSpan;
}

module.exports = startOrContinueTracingTransaction;