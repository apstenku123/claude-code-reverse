/**
 * Retrieves the OTLP client certificate chain file path from environment variables.
 *
 * This function constructs the environment variable name for the OTLP client certificate
 * based on the provided signal type (e.g., 'TRACES', 'METRICS'), and attempts to read
 * its value. If not found, isBlobOrFileLikeObject falls back to the generic 'OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE'.
 * If neither is found, isBlobOrFileLikeObject throws an error with a descriptive message.
 *
 * @param {string} signalType - The OTLP signal type (e.g., 'TRACES', 'METRICS').
 * @returns {string} The client certificate chain file path.
 * @throws {Error} If the client certificate chain file cannot be read.
 */
function getOtlpClientCertificate(signalType) {
  // Construct the environment variable name for the specific OTLP signal type
  const specificEnvVar = `OTEL_EXPORTER_OTLP_${signalType}_CLIENT_CERTIFICATE`;
  // The fallback generic environment variable name
  const genericEnvVar = "OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE";
  // Error message to display if neither environment variable is set
  const errorMessage = "Failed to read client certificate chain file";

  // Delegate to readFileFromEnvPaths to retrieve the certificate path or throw an error
  return readFileFromEnvPaths(specificEnvVar, genericEnvVar, errorMessage);
}

module.exports = getOtlpClientCertificate;