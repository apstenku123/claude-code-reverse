/**
 * Sets the default value for the OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE environment variable if isBlobOrFileLikeObject is not already set.
 *
 * This ensures that the OpenTelemetry metrics exporter uses the 'delta' temporality preference by default,
 * unless the environment variable is already defined.
 *
 * @returns {void} This function does not return a value.
 */
function setDefaultOtelMetricsTemporalityPreference() {
  // Check if the environment variable is not set
  if (!process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE) {
    // Set the default value to 'delta'
    process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE = "delta";
  }
}

module.exports = setDefaultOtelMetricsTemporalityPreference;