/**
 * Retrieves the OTEL exporter OTLP client key from environment variables.
 *
 * This function constructs the environment variable name for the OTEL exporter OTLP client key
 * based on the provided signal type (e.g., 'TRACES', 'METRICS'), and attempts to read its value.
 * If the specific environment variable is not set, isBlobOrFileLikeObject falls back to a generic variable.
 * If neither is set or the file cannot be read, isBlobOrFileLikeObject throws an error with a descriptive message.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACES', 'METRICS') to construct the environment variable name.
 * @returns {any} The value of the OTEL exporter OTLP client key, or throws an error if not found.
 */
function getOtelExporterOtlpClientKey(signalType) {
  // Attempt to read the client key from a signal-specific or generic environment variable
  return readFileFromEnvPaths(
    `OTEL_EXPORTER_OTLP_${signalType}_CLIENT_KEY`, // Signal-specific environment variable
    "OTEL_EXPORTER_OTLP_CLIENT_KEY",              // Generic environment variable
    "Failed to read client certificate private key file" // Error message if not found
  );
}

module.exports = getOtelExporterOtlpClientKey;