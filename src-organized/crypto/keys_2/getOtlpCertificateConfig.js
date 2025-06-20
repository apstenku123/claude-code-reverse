/**
 * Retrieves the OTLP exporter root certificate configuration variable name for a given signal type.
 *
 * This function constructs the environment variable name for the OTLP exporter root certificate
 * based on the provided signal type (e.g., 'TRACES', 'METRICS'), and attempts to read the certificate
 * file using the helper function `readFileFromEnvPaths`. If the specific signal type variable is not found, isBlobOrFileLikeObject falls back
 * to the generic certificate variable. If neither is found, isBlobOrFileLikeObject throws an error with a descriptive message.
 *
 * @param {string} signalType - The OTLP signal type (e.g., 'TRACES', 'METRICS') for which to retrieve the certificate.
 * @returns {string} The contents of the root certificate file for the specified signal type.
 * @throws {Error} If the certificate file cannot be read.
 */
function getOtlpCertificateConfig(signalType) {
  // Construct the environment variable name for the specific signal type
  const specificCertificateEnvVar = `OTEL_EXPORTER_OTLP_${signalType}_CERTIFICATE`;
  // The generic environment variable name for the certificate
  const genericCertificateEnvVar = "OTEL_EXPORTER_OTLP_CERTIFICATE";
  // Error message to use if the certificate cannot be read
  const errorMessage = "Failed to read root certificate file";

  // Attempt to read the certificate using the helper function
  return readFileFromEnvPaths(specificCertificateEnvVar, genericCertificateEnvVar, errorMessage);
}

module.exports = getOtlpCertificateConfig;