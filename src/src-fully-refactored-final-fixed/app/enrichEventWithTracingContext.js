/**
 * Enriches an event object with tracing and dynamic sampling context information.
 *
 * This function augments the provided event object with trace context, dynamic sampling context,
 * and transaction name (if available) based on the provided span. It is typically used to ensure
 * that events sent to a monitoring or observability service contain the necessary context for
 * distributed tracing and sampling decisions.
 *
 * @param {Object} event - The event object to be enriched. This object will be mutated.
 * @param {Object} span - The span object containing tracing information.
 * @returns {void} This function mutates the event object in place and does not return a value.
 */
function enrichEventWithTracingContext(event, span) {
  // Add trace context to the event'createInteractionAccessor contexts property
  event.contexts = {
    trace: ABA.spanToTraceContext(span),
    ...event.contexts
  };

  // Attempt to get the root span from the provided span
  const rootSpan = Zo2.getRootSpan(span);
  if (rootSpan) {
    // Add dynamic sampling context to the event'createInteractionAccessor sdkProcessingMetadata property
    event.sdkProcessingMetadata = {
      dynamicSamplingContext: Go2.getDynamicSamplingContextFromSpan(span),
      ...event.sdkProcessingMetadata
    };

    // Attempt to extract the transaction name from the root span'createInteractionAccessor description
    const transactionName = ABA.spanToJSON(rootSpan).description;
    if (transactionName) {
      // Add the transaction name as a tag on the event
      event.tags = {
        transaction: transactionName,
        ...event.tags
      };
    }
  }
}

module.exports = enrichEventWithTracingContext;