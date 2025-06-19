/**
 * Creates an OTLP gRPC network exporter delegate using the provided configuration and transport settings.
 *
 * @param {Object} exporterOptions - Options for the OTLP exporter, including url, compression, credentials, and metadata.
 * @param {Object} delegateConfig - Additional configuration for the network export delegate.
 * @param {string} grpcServiceName - The gRPC service name to use for the exporter.
 * @param {string} grpcServicePath - The gRPC path to use for the exporter.
 * @returns {any} The created OTLP network export delegate instance.
 */
function createOtlpGrpcNetworkExporter(exporterOptions, delegateConfig, grpcServiceName, grpcServicePath) {
  // Create the gRPC exporter transport with the provided exporter options and gRPC details
  const grpcExporterTransport = WZ6.createOtlpGrpcExporterTransport({
    address: exporterOptions.url,
    compression: exporterOptions.compression,
    credentials: exporterOptions.credentials,
    metadata: exporterOptions.metadata,
    grpcName: grpcServiceName,
    grpcPath: grpcServicePath
  });

  // Create and return the OTLP network export delegate using the transport and configuration
  return YZ6.createOtlpNetworkExportDelegate(exporterOptions, delegateConfig, grpcExporterTransport);
}

module.exports = createOtlpGrpcNetworkExporter;