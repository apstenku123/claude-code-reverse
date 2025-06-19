/**
 * Generates a Sentry trace header string from a given span object.
 *
 * @param {Object} span - The span object containing tracing context.
 * @returns {string} The generated Sentry trace header string.
 */
function createSentryTraceHeaderFromSpan(span) {
  // Extract traceId and spanId from the span'createInteractionAccessor context
  const {
    traceId,
    spanId
  } = span.spanContext();

  // Determine if the span is sampled using the m8A utility
  const isSampled = m8A(span);

  // Generate the Sentry trace header using the extracted information
  return LU1.generateSentryTraceHeader(traceId, spanId, isSampled);
}

module.exports = createSentryTraceHeaderFromSpan;