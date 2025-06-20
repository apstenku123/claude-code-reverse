/**
 * Retrieves and merges OTEL exporter OTLP headers from environment variables.
 *
 * This function checks for environment variables specific to the provided signal type (e.g., 'TRACE', 'METRIC')
 * and the generic OTEL exporter OTLP headers. It parses both sets of headers into key-value objects and merges them,
 * giving precedence to the signal-specific headers. If neither set of headers is present, isBlobOrFileLikeObject returns undefined.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACE', 'METRIC') used to look up signal-specific headers.
 * @returns {Object|undefined} An object containing merged OTEL exporter OTLP headers, or undefined if none are set.
 */
function getOtelExporterOtlpHeaders(signalType) {
  // Retrieve and trim signal-specific headers from environment variables
  const signalSpecificHeadersRaw = process.env[`OTEL_EXPORTER_OTLP_${signalType}_HEADERS`]?.trim();
  // Retrieve and trim generic OTEL exporter OTLP headers from environment variables
  const genericHeadersRaw = process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim();

  // Parse the raw header strings into key-value record objects
  const signalSpecificHeaders = sG1.parseKeyPairsIntoRecord(signalSpecificHeadersRaw);
  const genericHeaders = sG1.parseKeyPairsIntoRecord(genericHeadersRaw);

  // If both header objects are empty, return undefined
  if (Object.keys(signalSpecificHeaders).length === 0 && Object.keys(genericHeaders).length === 0) {
    return;
  }

  // Merge generic headers and signal-specific headers, with signal-specific headers taking precedence
  return Object.assign({}, genericHeaders, signalSpecificHeaders);
}

module.exports = getOtelExporterOtlpHeaders;