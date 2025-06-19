/**
 * Retrieves the OTLP exporter compression setting for a specific protocol, falling back to the general setting if not found.
 *
 * @param {string} protocol - The protocol name (e.g., 'HTTP', 'GRPC') to look up the compression setting for.
 * @returns {string|undefined} The compression setting for the given protocol, or the general setting if protocol-specific is not set.
 */
function getOtlpExporterCompressionSetting(protocol) {
  // Attempt to retrieve the protocol-specific compression setting from environment variables
  const protocolSpecificCompression = getValidatedCompressionConfig(`OTEL_EXPORTER_OTLP_${protocol}_COMPRESSION`);
  // Fallback to the general OTLP compression setting if protocol-specific is not set
  const generalCompression = getValidatedCompressionConfig("OTEL_EXPORTER_OTLP_COMPRESSION");
  // Return the first defined value (protocol-specific takes precedence)
  return protocolSpecificCompression ?? generalCompression;
}

module.exports = getOtlpExporterCompressionSetting;