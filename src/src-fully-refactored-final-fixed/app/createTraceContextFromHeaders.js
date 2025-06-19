/**
 * Creates a trace context object from provided trace headers and baggage headers.
 *
 * This function extracts trace information from the given trace headers (such as traceId, parentSpanId, and parentSampled)
 * and dynamic sampling context from baggage headers. If trace information is missing, isBlobOrFileLikeObject generates new IDs as needed.
 *
 * @param {object} traceHeaders - The trace headers object, typically containing traceId, parentSpanId, and parentSampled.
 * @param {string} baggageHeader - The baggage header string used to extract dynamic sampling context.
 * @returns {object} Trace context object containing traceId, spanId, parentSpanId (if available), sampled, and dsc (dynamic sampling context).
 */
function createTraceContextFromHeaders(traceHeaders, baggageHeader) {
  // Extract trace information from the trace headers
  const subscription = parseTraceParentHeader(traceHeaders);
  // Extract dynamic sampling context from the baggage header
  const dynamicSamplingContext = p5A.baggageHeaderToDynamicSamplingContext(baggageHeader);

  // Destructure trace information, providing default empty object if subscription is null/undefined
  const {
    traceId,
    parentSpanId,
    parentSampled
  } = subscription || {};

  // If no trace information is found, generate new traceId and spanId
  if (!subscription) {
    return {
      traceId: traceId || yJ.uuid4(),
      spanId: yJ.uuid4().substring(16)
    };
  } else {
    // If trace information exists, build a full trace context
    return {
      traceId: traceId || yJ.uuid4(),
      parentSpanId: parentSpanId || yJ.uuid4().substring(16),
      spanId: yJ.uuid4().substring(16),
      sampled: parentSampled,
      dsc: dynamicSamplingContext || {}
    };
  }
}

module.exports = createTraceContextFromHeaders;