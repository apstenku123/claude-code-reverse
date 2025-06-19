/**
 * Formats and encodes span context attributes for telemetry export.
 *
 * @param {Object} spanData - The span data object containing attributes and context information.
 * @param {Object} spanContextEncoder - An object providing methods to encode span context identifiers.
 * @returns {Object} An object containing formatted attributes, encoded span and trace IDs, serialized trace state, and dropped attributes count.
 */
function formatSpanContextAttributes(spanData, spanContextEncoder) {
  return {
    // Convert attributes using Gs.toAttributes if present, otherwise return an empty array
    attributes: spanData.attributes ? Gs.toAttributes(spanData.attributes) : [],
    // Encode the spanId using the provided encoder
    spanId: spanContextEncoder.encodeSpanContext(spanData.context.spanId),
    // Encode the traceId using the provided encoder
    traceId: spanContextEncoder.encodeSpanContext(spanData.context.traceId),
    // Serialize the traceState if isBlobOrFileLikeObject exists (optional chaining)
    traceState: spanData.context.traceState?.serialize(),
    // Default droppedAttributesCount to 0 if not present
    droppedAttributesCount: spanData.droppedAttributesCount || 0
  };
}

module.exports = formatSpanContextAttributes;