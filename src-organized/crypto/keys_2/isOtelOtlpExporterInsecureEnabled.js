/**
 * Determines if the OTEL OTLP exporter is set to insecure mode for a given signal type.
 *
 * Checks environment variables for signal-specific and global insecure flags, and returns true if either is set to 'true'.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACES', 'METRICS', etc.) to check for insecure exporter configuration.
 * @returns {boolean} True if insecure mode is enabled for the given signal type or globally; otherwise, false.
 */
function isOtelOtlpExporterInsecureEnabled(signalType) {
  // Retrieve the signal-specific insecure environment variable, if set
  const signalSpecificInsecure = process.env[`OTEL_EXPORTER_OTLP_${signalType}_INSECURE`]?.toLowerCase().trim();
  // Retrieve the global insecure environment variable, if set
  const globalInsecure = process.env.OTEL_EXPORTER_OTLP_INSECURE?.toLowerCase().trim();
  // Use getFirstNonEmptyValue to determine if either variable is set to 'true'
  return getFirstNonEmptyValue(signalSpecificInsecure, globalInsecure) === "true";
}

module.exports = isOtelOtlpExporterInsecureEnabled;