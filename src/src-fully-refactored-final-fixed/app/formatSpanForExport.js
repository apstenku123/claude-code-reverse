/**
 * Formats a span object for export by extracting relevant properties,
 * merging additional span data, and removing undefined keys.
 *
 * @param {Object} span - The span object to format. Must implement spanContext().
 * @returns {Object} An object containing the formatted span data, with undefined values removed.
 */
function formatSpanForExport(span) {
  // Extract spanId and traceId from the span'createInteractionAccessor context
  const {
    spanId,
    traceId
  } = span.spanContext();

  // Extract additional span data using the getSerializableSpanData utility
  const {
    data,
    op,
    parent_span_id: parentSpanId,
    status,
    tags,
    origin
  } = getSerializableSpanData(span);

  // Build the export object, mapping keys to their respective values
  const spanExport = {
    data,
    op,
    parent_span_id: parentSpanId,
    span_id: spanId,
    status,
    tags,
    trace_id: traceId,
    origin
  };

  // Remove any keys with undefined values before returning
  return LU1.dropUndefinedKeys(spanExport);
}

module.exports = formatSpanForExport;