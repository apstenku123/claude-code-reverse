/**
 * Retrieves the OpenTelemetry OTLP exporter endpoint for a given signal type (e.g., TRACE, METRIC, LOG).
 * It first checks for a signal-specific environment variable (e.g., OTEL_EXPORTER_OTLP_TRACE_ENDPOINT),
 * and falls back to the generic OTEL_EXPORTER_OTLP_ENDPOINT if the specific one is not set.
 * Both environment variables are trimmed of whitespace before use.
 *
 * @param {string} signalType - The signal type for which to retrieve the OTLP endpoint (e.g., 'TRACE', 'METRIC', 'LOG').
 * @returns {string|undefined} The resolved OTLP endpoint URL, or undefined if neither environment variable is set.
 */
function getOtelExporterOtlpEndpoint(signalType) {
  // Attempt to retrieve the signal-specific OTLP endpoint from environment variables
  const signalSpecificEndpoint = process.env[`OTEL_EXPORTER_OTLP_${signalType}_ENDPOINT`]?.trim();
  // Attempt to retrieve the generic OTLP endpoint from environment variables
  const genericEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();
  // Use external utility to resolve which endpoint to use (signal-specific takes precedence if set)
  return getFirstNonEmptyValue(signalSpecificEndpoint, genericEndpoint);
}

module.exports = getOtelExporterOtlpEndpoint;