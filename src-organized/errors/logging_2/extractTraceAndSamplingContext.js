/**
 * Extracts traceparent data, dynamic sampling context, and propagation context from the provided trace header and baggage header.
 *
 * @param {string} traceHeader - The traceparent header string, typically from an incoming request or context.
 * @param {string} baggageHeader - The baggage header string, used for dynamic sampling context extraction.
 * @returns {object} An object containing traceparentData, dynamicSamplingContext, and propagationContext.
 */
function extractTraceAndSamplingContext(traceHeader, baggageHeader) {
  // Parse the traceparent header to extract trace context information
  const traceparentData = parseTraceParentHeader(traceHeader);

  // Convert the baggage header to a dynamic sampling context object
  const dynamicSamplingContext = p5A.baggageHeaderToDynamicSamplingContext(baggageHeader);

  // Destructure relevant fields from the traceparent data, if available
  const {
    traceId = undefined,
    parentSpanId = undefined,
    parentSampled = undefined
  } = traceparentData || {};

  // If traceparent data is missing, generate new trace and span IDs
  if (!traceparentData) {
    return {
      traceparentData: traceparentData,
      dynamicSamplingContext: undefined,
      propagationContext: {
        traceId: traceId || yJ.uuid4(),
        spanId: yJ.uuid4().substring(16)
      }
    };
  }

  // If traceparent data exists, build the full propagation context
  return {
    traceparentData: traceparentData,
    dynamicSamplingContext: dynamicSamplingContext || {},
    propagationContext: {
      traceId: traceId || yJ.uuid4(),
      parentSpanId: parentSpanId || yJ.uuid4().substring(16),
      spanId: yJ.uuid4().substring(16),
      sampled: parentSampled,
      dsc: dynamicSamplingContext || {}
    }
  };
}

module.exports = extractTraceAndSamplingContext;