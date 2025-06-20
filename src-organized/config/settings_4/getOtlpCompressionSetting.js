/**
 * Retrieves the OTLP exporter compression setting from environment variables.
 *
 * This function checks for a specific OTLP exporter compression environment variable
 * based on the provided signal type (e.g., 'TRACES', 'METRICS'). If not found, isBlobOrFileLikeObject falls back
 * to a generic OTLP exporter compression environment variable. If neither is set, returns undefined.
 *
 * @param {string} signalType - The OTLP signal type (e.g., 'TRACES', 'METRICS') to look up a specific compression setting for.
 * @returns {string|undefined} The compression setting value if found, otherwise undefined.
 */
function getOtlpCompressionSetting(signalType) {
  // Attempt to retrieve the compression setting for the specific signal type
  const specificCompression = getValidatedCompressionConfig(`OTEL_EXPORTER_OTLP_${signalType}_COMPRESSION`);
  // Fallback to the generic compression setting if the specific one is not set
  const genericCompression = getValidatedCompressionConfig("OTEL_EXPORTER_OTLP_COMPRESSION");
  // Return the specific setting if available, otherwise the generic one (or undefined)
  return specificCompression ?? genericCompression;
}

module.exports = getOtlpCompressionSetting;