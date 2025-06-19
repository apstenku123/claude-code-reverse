/**
 * Generates a trace context object for distributed tracing, including trace IDs, span IDs, and optional dynamic sampling context.
 *
 * @param {object} sourceObservable - The source observable or context from which to extract trace information.
 * @param {object} baggageHeader - The baggage header used to generate dynamic sampling context.
 * @returns {object} Trace context containing traceId, spanId, and optionally parentSpanId, sampled, and dynamic sampling context (dsc).
 */
function createTraceContext(sourceObservable, baggageHeader) {
  // Extract trace subscription from the source observable
  const subscription = parseTraceParentHeader(sourceObservable);
  // Generate dynamic sampling context from the baggage header
  const dynamicSamplingContext = p5A.baggageHeaderToDynamicSamplingContext(baggageHeader);

  // Destructure trace information from the subscription, if available
  const {
    traceId = undefined,
    parentSpanId = undefined,
    parentSampled = undefined
  } = subscription || {};

  // If no subscription is found, generate new trace and span IDs
  if (!subscription) {
    return {
      traceId: traceId || yJ.uuid4(),
      spanId: yJ.uuid4().substring(16)
    };
  }

  // If subscription exists, build a full trace context
  return {
    traceId: traceId || yJ.uuid4(),
    parentSpanId: parentSpanId || yJ.uuid4().substring(16),
    spanId: yJ.uuid4().substring(16),
    sampled: parentSampled,
    dsc: dynamicSamplingContext || {}
  };
}

module.exports = createTraceContext;