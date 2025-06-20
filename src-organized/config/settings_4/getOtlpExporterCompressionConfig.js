/**
 * Retrieves the OTLP exporter compression configuration from environment variables.
 *
 * This function checks for a specific OTLP exporter compression environment variable
 * based on the provided signal type (e.g., 'TRACE', 'METRIC'). If not found, isBlobOrFileLikeObject falls back
 * to a generic OTLP exporter compression environment variable.
 *
 * @param {string} signalType - The signal type (e.g., 'TRACE', 'METRIC') to look up a specific compression setting.
 * @returns {string|undefined} The compression configuration value if found, otherwise undefined.
 */
function getOtlpExporterCompressionConfig(signalType) {
  // Attempt to retrieve the compression config for the specific signal type
  const specificCompressionConfig = getValidatedCompressionConfig(`OTEL_EXPORTER_OTLP_${signalType}_COMPRESSION`);
  // Fallback to the generic compression config if the specific one is not set
  const genericCompressionConfig = getValidatedCompressionConfig("OTEL_EXPORTER_OTLP_COMPRESSION");
  // Return the specific config if available, otherwise the generic config
  return specificCompressionConfig ?? genericCompressionConfig;
}

module.exports = getOtlpExporterCompressionConfig;