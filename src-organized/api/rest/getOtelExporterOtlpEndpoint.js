/**
 * Retrieves and processes the OTEL exporter OTLP endpoint for a given signal type.
 *
 * This utility function looks up the environment variable corresponding to the OTEL exporter OTLP endpoint
 * for the specified signal type (e.g., 'TRACE', 'METRIC'), trims any whitespace, and if a valid endpoint is found,
 * passes isBlobOrFileLikeObject to the V26 processing function.
 *
 * @param {string} signalType - The OTEL signal type (e.g., 'TRACE', 'METRIC') used to construct the environment variable name.
 * @returns {string|undefined} The processed endpoint string returned by V26, or undefined if not set.
 */
function getOtelExporterOtlpEndpoint(signalType) {
  // Construct the environment variable name for the given signal type
  const envVarName = `OTEL_EXPORTER_OTLP_${signalType}_ENDPOINT`;

  // Retrieve and trim the endpoint value from environment variables
  const endpoint = process.env[envVarName]?.trim();

  // If the endpoint is not set or is an empty string, return undefined
  if (endpoint == null || endpoint === "") {
    return;
  }

  // Pass the valid endpoint to the V26 processing function and return its result
  return V26(endpoint);
}

module.exports = getOtelExporterOtlpEndpoint;