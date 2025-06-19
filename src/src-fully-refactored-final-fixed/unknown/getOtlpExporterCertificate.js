/**
 * Retrieves the OTLP exporter root certificate file path for a given signal type.
 *
 * This function attempts to read the root certificate file path from an environment variable
 * specific to the provided signal type (e.g., 'TRACES', 'METRICS'), falling back to a default
 * environment variable if the specific one is not set. If neither is set, isBlobOrFileLikeObject throws an error.
 *
 * @param {string} signalType - The OTLP signal type (e.g., 'TRACES', 'METRICS') for which to retrieve the certificate.
 * @returns {string} The path to the OTLP exporter root certificate file.
 * @throws Will throw an error if neither environment variable is set or the file cannot be read.
 */
function getOtlpExporterCertificate(signalType) {
  // Attempt to read the certificate file path from the environment variable specific to the signal type.
  // If not found, fall back to the generic OTEL_EXPORTER_OTLP_CERTIFICATE variable.
  // If neither is set, throw an error with a descriptive message.
  return readFileFromEnvPaths(
    `OTEL_EXPORTER_OTLP_${signalType}_CERTIFICATE`,
    "OTEL_EXPORTER_OTLP_CERTIFICATE",
    "Failed to read root certificate file"
  );
}

module.exports = getOtlpExporterCertificate;