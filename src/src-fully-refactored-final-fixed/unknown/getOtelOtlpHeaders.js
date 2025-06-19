/**
 * Retrieves and merges OTEL OTLP exporter headers from environment variables for a specific signal type.
 *
 * This function looks for signal-specific headers (e.g., OTEL_EXPORTER_OTLP_TRACES_HEADERS) and generic headers (OTEL_EXPORTER_OTLP_HEADERS),
 * parses them into key-value records, and merges them, giving precedence to signal-specific headers.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACES', 'METRICS', 'LOGS') to look up specific headers for.
 * @returns {Object|undefined} An object containing merged header key-value pairs, or undefined if no headers are found.
 */
function getOtelOtlpHeaders(signalType) {
  // Retrieve and trim the signal-specific headers from environment variables
  const signalSpecificHeadersRaw = process.env[`OTEL_EXPORTER_OTLP_${signalType}_HEADERS`]?.trim();
  // Retrieve and trim the generic headers from environment variables
  const genericHeadersRaw = process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim();

  // Parse the raw header strings into key-value records
  const signalSpecificHeaders = sG1.parseKeyPairsIntoRecord(signalSpecificHeadersRaw);
  const genericHeaders = sG1.parseKeyPairsIntoRecord(genericHeadersRaw);

  // If both header records are empty, return undefined
  if (Object.keys(signalSpecificHeaders).length === 0 && Object.keys(genericHeaders).length === 0) {
    return;
  }

  // Merge generic headers and signal-specific headers, with signal-specific headers taking precedence
  return Object.assign({}, genericHeaders, signalSpecificHeaders);
}

module.exports = getOtelOtlpHeaders;
