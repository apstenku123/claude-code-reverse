/**
 * Checks if the provided trace and span identifiers are valid.
 *
 * This function validates the traceId and spanId properties of the given traceContext object
 * by delegating to the external isValidTraceId and isValidSpanId validation functions.
 *
 * @param {Object} traceContext - An object containing trace and span identifiers.
 * @param {string} traceContext.traceId - The trace identifier to validate.
 * @param {string} traceContext.spanId - The span identifier to validate.
 * @returns {boolean} True if both traceId and spanId are valid, false otherwise.
 */
function isValidTraceAndSpan(traceContext) {
  // Validate traceId using isValidTraceId and spanId using isValidSpanId
  return isValidTraceId(traceContext.traceId) && isValidSpanId(traceContext.spanId);
}

module.exports = isValidTraceAndSpan;