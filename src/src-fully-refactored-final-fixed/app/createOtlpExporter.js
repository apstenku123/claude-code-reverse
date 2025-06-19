/**
 * Creates an OTLP (OpenTelemetry Protocol) exporter delegate with retrying transport, serialization, and bounded queue promise handling.
 *
 * @param {Object} exporterOptions - Configuration options for the exporter.
 * @param {Object} serializer - Serializer instance or function for export data.
 * @returns {Object} OTLP export delegate instance.
 */
function createOtlpExporter(exporterOptions, serializer) {
  // Create the HTTP transport for exporting telemetry data
  const httpExporterTransport = s06.createHttpExporterTransport(exporterOptions);

  // Wrap the HTTP transport with retrying logic
  const retryingTransport = o06.createRetryingTransport({
    transport: httpExporterTransport
  });

  // Create a bounded queue promise handler for managing export promises
  const boundedQueuePromiseHandler = r06.createBoundedQueueExportPromiseHandler(exporterOptions);

  // Create and return the OTLP export delegate with all configured components
  return a06.createOtlpExportDelegate({
    transport: retryingTransport,
    serializer: serializer,
    promiseHandler: boundedQueuePromiseHandler
  }, {
    timeout: exporterOptions.timeoutMillis
  });
}

module.exports = createOtlpExporter;