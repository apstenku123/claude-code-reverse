/**
 * Checks if both the traceId and spanId properties of the given traceContext object are valid.
 *
 * This function uses the external validators isValidTraceId and isValidSpanId to validate the traceId and spanId, respectively.
 *
 * @param {Object} traceContext - The object containing trace and span identifiers.
 * @param {string} traceContext.traceId - The unique identifier for the trace.
 * @param {string} traceContext.spanId - The unique identifier for the span.
 * @returns {boolean} Returns true if both traceId and spanId are valid, false otherwise.
 */
function areTraceAndSpanIdsValid(traceContext) {
  // Validate traceId using isValidTraceId and spanId using isValidSpanId
  return isValidTraceId(traceContext.traceId) && isValidSpanId(traceContext.spanId);
}

module.exports = areTraceAndSpanIdsValid;