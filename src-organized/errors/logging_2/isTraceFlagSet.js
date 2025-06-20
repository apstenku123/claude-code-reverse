/**
 * Checks if a specific trace flag is set in the span context of the provided object.
 *
 * @param {Object} traceCarrier - An object that provides a spanContext() method returning a context with traceFlags.
 * @returns {boolean} True if the required trace flag is set; otherwise, false.
 */
function isTraceFlagSet(traceCarrier) {
  // Retrieve the span context from the carrier object
  const spanContext = traceCarrier.spanContext();

  // Extract the traceFlags property from the span context
  const { traceFlags } = spanContext;

  // Check if the specific trace flag (g8A) is set using bitwise AND
  // 'g8A' should be defined elsewhere in the codebase as the flag mask
  return Boolean(traceFlags & g8A);
}

module.exports = isTraceFlagSet;