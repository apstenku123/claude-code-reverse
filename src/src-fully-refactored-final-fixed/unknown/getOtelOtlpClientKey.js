/**
 * Retrieves the OTEL OTLP client key from environment variables or configuration.
 *
 * This function attempts to read the client certificate private key file for the specified OTLP signal type (e.g., TRACE, METRIC).
 * It constructs the environment variable name dynamically based on the provided signal type and delegates the retrieval to the readFileFromEnvPaths utility function.
 *
 * @param {string} signalType - The OTLP signal type (e.g., 'TRACE', 'METRIC') to construct the environment variable name.
 * @returns {any} The result of the readFileFromEnvPaths function, typically the client key or an error message if retrieval fails.
 */
function getOtelOtlpClientKey(signalType) {
  // Construct the environment variable name for the specific OTLP signal type
  const envVarName = `OTEL_EXPORTER_OTLP_${signalType}_CLIENT_KEY`;
  // Fallback environment variable name if the specific one is not set
  const fallbackEnvVarName = "OTEL_EXPORTER_OTLP_CLIENT_KEY";
  // Error message to use if the client key cannot be read
  const errorMessage = "Failed to read client certificate private key file";

  // Delegate to the readFileFromEnvPaths utility function to retrieve the client key
  return readFileFromEnvPaths(envVarName, fallbackEnvVarName, errorMessage);
}

module.exports = getOtelOtlpClientKey;