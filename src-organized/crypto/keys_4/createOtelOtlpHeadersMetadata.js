/**
 * Creates OTEL OTLP headers metadata by merging specific and generic environment variables.
 *
 * This function reads OTEL exporter OTLP header environment variables, parses them into key-value pairs,
 * merges them (giving precedence to the specific variable), and returns a metadata object populated with these headers.
 *
 * @param {string} signalType - The OTLP signal type (e.g., 'TRACES', 'METRICS', 'LOGS') used to construct the specific environment variable name.
 * @returns {object|undefined} a metadata object with the merged headers set, or undefined if no headers are found.
 */
function createOtelOtlpHeadersMetadata(signalType) {
  // Read the specific OTEL OTLP headers environment variable for the given signal type
  const specificHeadersEnv = process.env[`OTEL_EXPORTER_OTLP_${signalType}_HEADERS`]?.trim();
  // Read the generic OTEL OTLP headers environment variable
  const genericHeadersEnv = process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim();

  // Parse the environment variable strings into key-value record objects
  const specificHeaders = Nx0.parseKeyPairsIntoRecord(specificHeadersEnv);
  const genericHeaders = Nx0.parseKeyPairsIntoRecord(genericHeadersEnv);

  // If both header records are empty, return undefined (no headers to set)
  if (Object.keys(specificHeaders).length === 0 && Object.keys(genericHeaders).length === 0) {
    return;
  }

  // Merge headers, giving precedence to specific headers over generic ones
  const mergedHeaders = Object.assign({}, genericHeaders, specificHeaders);

  // Create an empty metadata object
  const metadata = ls.createEmptyMetadata();

  // Set each header key-value pair into the metadata object
  for (const [headerKey, headerValue] of Object.entries(mergedHeaders)) {
    metadata.set(headerKey, headerValue);
  }

  return metadata;
}

module.exports = createOtelOtlpHeadersMetadata;
