/**
 * Retrieves and merges OTEL OTLP exporter headers from environment variables,
 * parses them into key-value pairs, and returns them as metadata.
 *
 * The function checks for both resource-specific and global OTEL OTLP headers,
 * merges them (resource-specific headers take precedence), and returns a metadata object.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACES', 'METRICS', 'LOGS').
 * @returns {object|undefined} Metadata object containing merged headers, or undefined if no headers are set.
 */
function getOtelOtlpHeadersMetadata(signalType) {
  // Retrieve resource-specific headers from environment variable, if set
  const resourceHeadersRaw = process.env[`OTEL_EXPORTER_OTLP_${signalType}_HEADERS`]?.trim();
  // Retrieve global headers from environment variable, if set
  const globalHeadersRaw = process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim();

  // Parse the raw header strings into key-value record objects
  const resourceHeaders = Nx0.parseKeyPairsIntoRecord(resourceHeadersRaw);
  const globalHeaders = Nx0.parseKeyPairsIntoRecord(globalHeadersRaw);

  // If both header objects are empty, return undefined
  if (Object.keys(resourceHeaders).length === 0 && Object.keys(globalHeaders).length === 0) {
    return;
  }

  // Merge global and resource-specific headers (resource-specific takes precedence)
  const mergedHeaders = Object.assign({}, globalHeaders, resourceHeaders);

  // Create an empty metadata object
  const metadata = ls.createEmptyMetadata();

  // Set each header key-value pair in the metadata object
  for (const [headerKey, headerValue] of Object.entries(mergedHeaders)) {
    metadata.set(headerKey, headerValue);
  }

  return metadata;
}

module.exports = getOtelOtlpHeadersMetadata;