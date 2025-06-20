/**
 * Retrieves the OTEL exporter OTLP client certificate configuration value.
 *
 * This function attempts to read the client certificate chain file for the specified signal type (e.g., 'TRACES', 'METRICS').
 * It first checks for an environment variable specific to the signal type (e.g., 'OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE'),
 * then falls back to the generic 'OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE' environment variable if the specific one is not set.
 * If neither is found or readable, isBlobOrFileLikeObject throws an error with a descriptive message.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACES', 'METRICS') for which to retrieve the client certificate.
 * @returns {string} The client certificate chain file contents or path, as determined by the configuration.
 * @throws {Error} If the client certificate chain file cannot be read.
 */
function getOtelExporterOtlpClientCertificate(signalType) {
  // Attempt to retrieve the client certificate for the given signal type, with fallback and error message
  return readFileFromEnvPaths(
    `OTEL_EXPORTER_OTLP_${signalType}_CLIENT_CERTIFICATE`,
    "OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE",
    "Failed to read client certificate chain file"
  );
}

module.exports = getOtelExporterOtlpClientCertificate;