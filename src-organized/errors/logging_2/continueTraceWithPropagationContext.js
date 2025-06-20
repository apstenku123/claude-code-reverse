/**
 * Continues a tracing context from provided headers and optionally runs a callback within the propagated async context.
 *
 * @param {Object} headers - An object containing tracing headers.
 * @param {string} headers.sentryTrace - The sentry-trace header value.
 * @param {string} headers.baggage - The baggage header value.
 * @param {Function} [callback] - Optional callback to execute within the propagated async context. Receives the trace context as an argument.
 * @returns {Object|any} The trace context object, or the result of the callback if provided.
 */
function continueTraceWithPropagationContext(
  { sentryTrace, baggage },
  callback
) {
  // Get the current tracing scope
  const currentScope = ly.getCurrentScope();

  // Extract tracing context from headers
  const {
    traceparentData,
    dynamicSamplingContext,
    propagationContext
  } = Cc.tracingContextFromHeaders(sentryTrace, baggage);

  // Set the propagation context on the current scope
  currentScope.setPropagationContext(propagationContext);

  // Log trace continuation in debug mode
  if (Ct2.DEBUG_BUILD && traceparentData) {
    Cc.logger.log(`[Tracing] Continuing trace ${traceparentData.traceId}.`);
  }

  // Build the trace context object, dropping undefined keys from metadata
  const traceContext = {
    ...traceparentData,
    metadata: Cc.dropUndefinedKeys({
      dynamicSamplingContext
    })
  };

  // If no callback is provided, return the trace context
  if (!callback) {
    return traceContext;
  }

  // Otherwise, run the callback within the async context
  return kq.runWithAsyncContext(() => {
    return callback(traceContext);
  });
}

module.exports = continueTraceWithPropagationContext;