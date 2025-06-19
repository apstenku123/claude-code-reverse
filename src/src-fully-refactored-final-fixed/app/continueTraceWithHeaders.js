/**
 * Continues a tracing context using Sentry trace headers and optionally executes a callback within the async context.
 *
 * @param {Object} headers - An object containing Sentry tracing headers.
 * @param {string} headers.sentryTrace - The Sentry trace header value.
 * @param {string} headers.baggage - The Sentry baggage header value.
 * @param {Function} [callback] - Optional callback to execute with the constructed trace context.
 * @returns {Object|any} The constructed trace context, or the result of the callback if provided.
 */
function continueTraceWithHeaders({ sentryTrace, baggage }, callback) {
  // Get the current Sentry scope
  const currentScope = ly.getCurrentScope();

  // Extract tracing context information from the headers
  const {
    traceparentData: traceParentData,
    dynamicSamplingContext: dynamicSamplingContext,
    propagationContext: propagationContext
  } = Cc.tracingContextFromHeaders(sentryTrace, baggage);

  // Set the propagation context on the current scope
  currentScope.setPropagationContext(propagationContext);

  // If in debug mode and traceParentData exists, log the trace continuation
  if (Ct2.DEBUG_BUILD && traceParentData) {
    Cc.logger.log(`[Tracing] Continuing trace ${traceParentData.traceId}.`);
  }

  // Build the trace context object, dropping undefined keys from metadata
  const traceContext = {
    ...traceParentData,
    metadata: Cc.dropUndefinedKeys({
      dynamicSamplingContext: dynamicSamplingContext
    })
  };

  // If no callback is provided, return the trace context
  if (!callback) {
    return traceContext;
  }

  // Otherwise, run the callback within the async context, passing the trace context
  return kq.runWithAsyncContext(() => {
    return callback(traceContext);
  });
}

module.exports = continueTraceWithHeaders;
