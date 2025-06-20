/**
 * Determines if the specific trace flag is set in the given span context.
 *
 * @param {Object} spanProvider - An object that provides a spanContext() method.
 * @returns {boolean} True if the required trace flag is set; otherwise, false.
 */
function isTraceFlagSetInSpanContext(spanProvider) {
  // Retrieve the span context from the provider
  const { traceFlags } = spanProvider.spanContext();
  // Check if the required trace flag (g8A) is set using bitwise AND
  return Boolean(traceFlags & g8A);
}

module.exports = isTraceFlagSetInSpanContext;