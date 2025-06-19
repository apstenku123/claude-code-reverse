/**
 * Creates an OTLP export delegate utility with bounded queue promise handling.
 *
 * @param {Object} exportOptions - Options for the export operation, including timeoutMillis.
 * @param {Object} serializer - Serializer instance or configuration for the export process.
 * @param {Object} transport - Transport mechanism or configuration for OTLP export.
 * @returns {Function} OTLP export delegate function configured with the provided options.
 */
function createOtlpExportUtility(exportOptions, serializer, transport) {
  // Create a promise handler with a bounded queue using the provided export options
  const boundedQueuePromiseHandler = d16.createBoundedQueueExportPromiseHandler(exportOptions);

  // Create and return the OTLP export delegate with the specified transport, serializer, and promise handler
  return u16.createOtlpExportDelegate({
    transport: transport,
    serializer: serializer,
    promiseHandler: boundedQueuePromiseHandler
  }, {
    timeout: exportOptions.timeoutMillis
  });
}

module.exports = createOtlpExportUtility;