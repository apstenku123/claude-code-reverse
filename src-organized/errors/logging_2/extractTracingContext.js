/**
 * Extracts and constructs tracing context information from a traceparent header and baggage header.
 *
 * @param {object} traceparentHeader - The traceparent header object or string to extract tracing data from.
 * @param {object|string} baggageHeader - The baggage header to extract dynamic sampling context from.
 * @returns {object} An object containing traceparent data, dynamic sampling context, and propagation context.
 */
function extractTracingContext(traceparentHeader, baggageHeader) {
  // Extract traceparent data using parseTraceParentHeader utility
  const traceparentData = parseTraceParentHeader(traceparentHeader);

  // Extract dynamic sampling context from baggage header
  const dynamicSamplingContext = p5A.baggageHeaderToDynamicSamplingContext(baggageHeader);

  // Destructure relevant fields from traceparentData if available
  const {
    traceId,
    parentSpanId,
    parentSampled
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
  } else {
    // If traceparent data exists, build a full propagation context
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
}

module.exports = extractTracingContext;