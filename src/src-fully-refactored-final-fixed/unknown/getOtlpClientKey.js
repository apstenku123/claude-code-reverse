/**
 * Retrieves the OTLP client certificate private key file path from environment variables.
 *
 * This function constructs the environment variable name for the OTLP exporter client key
 * based on the provided signal type (e.g., 'TRACES', 'METRICS'), and attempts to read its value.
 * If the specific environment variable is not set, isBlobOrFileLikeObject falls back to a generic one.
 *
 * @param {string} signalType - The OTLP signal type (e.g., 'TRACES', 'METRICS').
 * @returns {string} The value of the client certificate private key file path, or throws an error if not found.
 */
function getOtlpClientKey(signalType) {
  // Attempt to read the specific or generic OTLP client key environment variable
  // Throws an error with a descriptive message if neither is found
  return readFileFromEnvPaths(
    `OTEL_EXPORTER_OTLP_${signalType}_CLIENT_KEY`,
    "OTEL_EXPORTER_OTLP_CLIENT_KEY",
    "Failed to read client certificate private key file"
  );
}

module.exports = getOtlpClientKey;