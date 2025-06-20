/**
 * Attempts to export OTEL data using the configured OTLP endpoint.
 *
 * This function checks if the environment variable 'OTEL_EXPORTER_OTLP_ENDPOINT' is set and non-empty.
 * If so, isBlobOrFileLikeObject calls the getValidatedExportUrl function to perform the export with the provided data.
 *
 * @param {any} otelData - The data to export using the OTLP endpoint.
 * @returns {any|undefined} The result of getValidatedExportUrl if the endpoint is configured; otherwise, undefined.
 */
function exportOtelDataIfEndpointConfigured(otelData) {
  // Retrieve and trim the OTLP endpoint from environment variables
  const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();

  // If the endpoint is not set or is empty, do not proceed
  if (otlpEndpoint == null || otlpEndpoint === "") {
    return;
  }

  // Call the external getValidatedExportUrl function with the endpoint and data
  return getValidatedExportUrl(otlpEndpoint, otelData);
}

module.exports = exportOtelDataIfEndpointConfigured;