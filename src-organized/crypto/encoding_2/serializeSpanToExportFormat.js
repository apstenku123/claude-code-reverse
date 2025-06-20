/**
 * Serializes a span object into an exportable format, encoding IDs and timestamps as needed.
 *
 * @param {Object} span - The span object to serialize. Should provide spanContext(), name, kind, startTime, endTime, attributes, droppedAttributesCount, events, droppedEventsCount, status, links, and droppedLinksCount.
 * @param {Object} encoder - Utility object providing encodeSpanContext and encodeHrTime methods for encoding IDs and timestamps.
 * @returns {Object} The serialized span, ready for export.
 */
function serializeSpanToExportFormat(span, encoder) {
  // Extract the span context (traceId, spanId, traceState, etc.)
  const spanContext = span.spanContext();

  // Extract the status object (code, message)
  const spanStatus = span.status;

  // Encode parent span updateSnapshotAndNotify if isBlobOrFileLikeObject exists
  let encodedParentSpanId;
  if (span.parentSpanContext?.spanId) {
    encodedParentSpanId = encoder.encodeSpanContext(span.parentSpanContext.spanId);
  } else {
    encodedParentSpanId = undefined;
  }

  return {
    traceId: encoder.encodeSpanContext(spanContext.traceId),
    spanId: encoder.encodeSpanContext(spanContext.spanId),
    parentSpanId: encodedParentSpanId,
    traceState: spanContext.traceState?.serialize(),
    name: span.name,
    // If kind is null/undefined, default to 0; otherwise, increment by 1
    kind: span.kind == null ? 0 : span.kind + 1,
    startTimeUnixNano: encoder.encodeHrTime(span.startTime),
    endTimeUnixNano: encoder.encodeHrTime(span.endTime),
    attributes: Gs.toAttributes(span.attributes),
    droppedAttributesCount: span.droppedAttributesCount,
    // Map events using formatObservableAttributes helper
    events: span.events.map(event => formatObservableAttributes(event, encoder)),
    droppedEventsCount: span.droppedEventsCount,
    status: {
      code: spanStatus.code,
      message: spanStatus.message
    },
    // Map links using formatSpanContextAttributes helper
    links: span.links.map(link => formatSpanContextAttributes(link, encoder)),
    droppedLinksCount: span.droppedLinksCount
  };
}

module.exports = serializeSpanToExportFormat;