/**
 * Retrieves and processes the OTEL exporter endpoint for a given signal type.
 *
 * Looks up the environment variable 'OTEL_EXPORTER_OTLP_<signalType>_ENDPOINT',
 * trims any whitespace, and if a valid endpoint is found, passes isBlobOrFileLikeObject to V26 for further processing.
 *
 * @param {string} signalType - The type of OTEL signal (e.g., 'TRACE', 'METRIC', etc.)
 * @returns {string|undefined} The result of V26 processing the endpoint, or undefined if not set
 */
function getOtelExporterEndpoint(signalType) {
  // Construct the environment variable name for the given signal type
  const envVarName = `OTEL_EXPORTER_OTLP_${signalType}_ENDPOINT`;

  // Retrieve and trim the endpoint value from environment variables
  const endpoint = process.env[envVarName]?.trim();

  // If the endpoint is not set or is an empty string, return undefined
  if (endpoint == null || endpoint === "") {
    return;
  }

  // Pass the valid endpoint to V26 for further processing
  return V26(endpoint);
}

module.exports = getOtelExporterEndpoint;
