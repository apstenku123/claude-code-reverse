/**
 * Continues a tracing context from incoming Sentry headers and optionally runs a callback within the async context.
 *
 * @param {Object} headers - The incoming Sentry tracing headers.
 * @param {string} headers.sentryTrace - The Sentry trace header string.
 * @param {string} headers.baggage - The Sentry baggage header string.
 * @param {Function} [callback] - Optional callback to execute with the constructed trace context.
 * @returns {Object|any} The constructed trace context, or the result of the callback if provided.
 */
function continueTraceWithContext(
  { sentryTrace, baggage },
  callback
) {
  // Get the current tracing scope
  const currentScope = ly.getCurrentScope();

  // Extract tracing information from the headers
  const {
    traceparentData,
    dynamicSamplingContext,
    propagationContext
  } = Cc.tracingContextFromHeaders(sentryTrace, baggage);

  // Set the propagation context on the current scope
  currentScope.setPropagationContext(propagationContext);

  // Log trace continuation if in debug mode and traceparentData exists
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

  // If no callback is provided, return the trace context directly
  if (!callback) {
    return traceContext;
  }

  // Otherwise, run the callback within the async context
  return kq.runWithAsyncContext(() => {
    return callback(traceContext);
  });
}

module.exports = continueTraceWithContext;