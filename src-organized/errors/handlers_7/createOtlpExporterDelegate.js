/**
 * Creates an OTLP (OpenTelemetry Protocol) export delegate with retrying transport and bounded queue promise handler.
 *
 * @param {Object} exporterOptions - Configuration options for the exporter, including endpoint and timeout.
 * @param {Object} serializer - Serializer instance or function to serialize data before export.
 * @returns {Object} OTLP export delegate instance configured with retrying transport and bounded queue handler.
 */
function createOtlpExporterDelegate(exporterOptions, serializer) {
  // Create the HTTP transport for exporting telemetry data
  const httpExporterTransport = s06.createHttpExporterTransport(exporterOptions);

  // Wrap the HTTP transport with retry logic
  const retryingTransport = o06.createRetryingTransport({
    transport: httpExporterTransport
  });

  // Create a bounded queue promise handler to manage export promises
  const boundedQueueExportPromiseHandler = r06.createBoundedQueueExportPromiseHandler(exporterOptions);

  // Create and return the OTLP export delegate with the configured transport, serializer, and promise handler
  return a06.createOtlpExportDelegate({
    transport: retryingTransport,
    serializer: serializer,
    promiseHandler: boundedQueueExportPromiseHandler
  }, {
    timeout: exporterOptions.timeoutMillis
  });
}

module.exports = createOtlpExporterDelegate;