/**
 * Creates an OTLP export delegate with a bounded queue promise handler.
 *
 * This utility function sets up an OTLP (OpenTelemetry Protocol) export delegate using the provided transport,
 * serializer configuration, and a bounded queue promise handler for managing export promises with a timeout.
 *
 * @param {Object} exportOptions - The export options, including timeoutMillis for promise handling.
 * @param {Object} serializerConfig - The serializer configuration for OTLP export.
 * @param {Object} transport - The transport mechanism for OTLP export (e.g., HTTP, gRPC).
 * @returns {Function} The OTLP export delegate function configured with the given options.
 */
function createOtlpExportDelegateWithBoundedQueue(exportOptions, serializerConfig, transport) {
  // Create a bounded queue promise handler using the provided export options (e.g., timeoutMillis)
  const boundedQueuePromiseHandler = d16.createBoundedQueueExportPromiseHandler(exportOptions);

  // Create and return the OTLP export delegate with the specified transport, serializer, and promise handler
  return u16.createOtlpExportDelegate({
    transport: transport,
    serializer: serializerConfig,
    promiseHandler: boundedQueuePromiseHandler
  }, {
    timeout: exportOptions.timeoutMillis
  });
}

module.exports = createOtlpExportDelegateWithBoundedQueue;