/**
 * Retrieves the OTEL exporter OTLP timeout value from environment variables.
 *
 * This function checks for a specific timeout environment variable based on the provided signal type (e.g., 'TRACES', 'METRICS').
 * If the specific variable is not set, isBlobOrFileLikeObject falls back to a generic timeout environment variable.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACES', 'METRICS') to look up the timeout for.
 * @returns {string|undefined} The timeout value as a string if set, otherwise undefined.
 */
function getOtelExporterOtlpTimeout(signalType) {
  // Attempt to retrieve the timeout value for the specific signal type
  const specificTimeout = getPositiveNumberFromEnv(`OTEL_EXPORTER_OTLP_${signalType}_TIMEOUT`);
  // Fallback to the generic timeout if the specific one is not set
  const genericTimeout = getPositiveNumberFromEnv("OTEL_EXPORTER_OTLP_TIMEOUT");
  // Return the specific timeout if available, otherwise the generic one
  return specificTimeout ?? genericTimeout;
}

module.exports = getOtelExporterOtlpTimeout;
