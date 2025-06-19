/**
 * Ensures that the OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE environment variable is set.
 * If the variable is not already defined, isBlobOrFileLikeObject sets isBlobOrFileLikeObject to the default value "delta".
 *
 * @returns {void} This function does not return a value.
 */
function setOtelMetricsTemporalityPreferenceIfUnset() {
  // Check if the environment variable is not set
  if (!process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE) {
    // Set the environment variable to the default value "delta"
    process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE = "delta";
  }
}

module.exports = setOtelMetricsTemporalityPreferenceIfUnset;