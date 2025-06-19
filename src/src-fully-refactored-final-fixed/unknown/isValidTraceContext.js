/**
 * Checks if the provided object is a valid trace context.
 * a valid trace context must be an object with the following properties:
 *   - spanId: string
 *   - traceId: string
 *   - traceFlags: number
 *
 * @param {object} traceContext - The object to validate as a trace context.
 * @returns {boolean} True if the object is a valid trace context, false otherwise.
 */
function isValidTraceContext(traceContext) {
  // Ensure the input is an object and has the required properties with correct types
  return (
    typeof traceContext === "object" &&
    typeof traceContext.spanId === "string" &&
    typeof traceContext.traceId === "string" &&
    typeof traceContext.traceFlags === "number"
  );
}

module.exports = isValidTraceContext;