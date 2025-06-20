/**
 * Retrieves the OTEL exporter OTLP certificate for a given signal type.
 *
 * This function attempts to read the root certificate file for the specified OTEL signal type (e.g., TRACE, METRIC, LOG).
 * It checks for an environment variable specific to the signal type (e.g., OTEL_EXPORTER_OTLP_TRACE_CERTIFICATE),
 * then falls back to the generic OTEL_EXPORTER_OTLP_CERTIFICATE variable if the specific one is not set.
 * If neither is set or the file cannot be read, isBlobOrFileLikeObject throws an error with a descriptive message.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACE', 'METRIC', 'LOG').
 * @returns {string} The contents of the root certificate file as a string.
 * @throws {Error} If the certificate file cannot be read.
 */
function getOtelExporterOtlpCertificate(signalType) {
  // Attempt to read the certificate file for the specific signal type, then fall back to the generic one
  return readFileFromEnvPaths(
    `OTEL_EXPORTER_OTLP_${signalType}_CERTIFICATE`, // Signal-specific environment variable
    "OTEL_EXPORTER_OTLP_CERTIFICATE",              // Generic environment variable
    "Failed to read root certificate file"          // Error message if reading fails
  );
}

module.exports = getOtelExporterOtlpCertificate;