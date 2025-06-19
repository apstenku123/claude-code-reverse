/**
 * Creates an OTLP (OpenTelemetry Protocol) export delegate with asynchronous bounded queue handling.
 *
 * @param {Object} exportOptions - Options for the export process, including timeoutMillis.
 * @param {Object} serializer - Serializer instance or configuration for the export.
 * @param {Object} transport - Transport mechanism or configuration for sending the export data.
 * @returns {Function} OTLP export delegate function configured with the provided options.
 */
function createOtlpAsyncExportDelegate(exportOptions, serializer, transport) {
  // Create a promise handler that manages a bounded queue for export operations
  const boundedQueuePromiseHandler = d16.createBoundedQueueExportPromiseHandler(exportOptions);

  // Delegate creation using the provided transport, serializer, and promise handler
  return u16.createOtlpExportDelegate({
    transport: transport,
    serializer: serializer,
    promiseHandler: boundedQueuePromiseHandler
  }, {
    timeout: exportOptions.timeoutMillis
  });
}

module.exports = createOtlpAsyncExportDelegate;