/**
 * Attempts to export OTEL data using the OTLP endpoint specified in the environment variable.
 *
 * @param {any} otelData - The data to be exported via the OTLP endpoint.
 * @returns {any|undefined} The result of the getValidatedExportUrl export function, or undefined if the endpoint is not set.
 */
function exportOtelDataIfEndpointSet(otelData) {
  // Retrieve the OTLP endpoint from environment variables and trim whitespace
  const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();

  // If the endpoint is not set or is an empty string, do not proceed
  if (otlpEndpoint == null || otlpEndpoint === "") {
    return;
  }

  // Call the export function with the endpoint and the provided data
  return getValidatedExportUrl(otlpEndpoint, otelData);
}

module.exports = exportOtelDataIfEndpointSet;