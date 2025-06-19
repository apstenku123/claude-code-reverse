/**
 * Retrieves the OTEL OTLP exporter endpoint for a given signal type from environment variables.
 *
 * This function checks for a signal-specific endpoint environment variable (e.g., OTEL_EXPORTER_OTLP_TRACES_ENDPOINT)
 * and falls back to the generic OTEL_EXPORTER_OTLP_ENDPOINT if the specific one is not set. Both values are trimmed of whitespace.
 * The selected values are then passed to the getFirstNonEmptyValue function for further processing.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACES', 'METRICS', 'LOGS') to look up the endpoint for.
 * @returns {any} The result of passing the resolved endpoint(createInteractionAccessor) to the getFirstNonEmptyValue function.
 */
function getOtelOtlpExporterEndpoint(signalType) {
  // Attempt to retrieve the signal-specific endpoint from environment variables
  const signalSpecificEndpoint = process.env[`OTEL_EXPORTER_OTLP_${signalType}_ENDPOINT`]?.trim();
  // Attempt to retrieve the generic OTEL exporter endpoint from environment variables
  const genericEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();
  // Pass both endpoints to getFirstNonEmptyValue for further processing (getFirstNonEmptyValue is assumed to handle undefined/null values appropriately)
  return getFirstNonEmptyValue(signalSpecificEndpoint, genericEndpoint);
}

module.exports = getOtelOtlpExporterEndpoint;
