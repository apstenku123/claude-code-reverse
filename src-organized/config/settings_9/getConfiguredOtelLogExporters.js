/**
 * Retrieves and instantiates OpenTelemetry log exporters based on environment variables.
 *
 * Reads the OTEL_LOGS_EXPORTER environment variable (comma-separated list),
 * and for each exporter type, creates the corresponding exporter instance.
 * Handles 'console' and 'otlp' exporters. For 'otlp', determines the protocol
 * from OTEL_EXPORTER_OTLP_LOGS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL.
 * Throws an error for unknown exporter types or protocols.
 *
 * @returns {Array<Object>} Array of instantiated log exporter objects.
 * @throws {Error} If an unknown exporter type or protocol is specified.
 */
function getConfiguredOtelLogExporters() {
  // Read and parse the OTEL_LOGS_EXPORTER environment variable
  const exporterTypes = (process.env.OTEL_LOGS_EXPORTER || "")
    .trim()
    .split(",")
    .filter(Boolean);

  const exporters = [];

  for (const exporterType of exporterTypes) {
    if (exporterType === "console") {
      // Add ConsoleLogRecordExporter if 'console' is specified
      exporters.push(new Bh.ConsoleLogRecordExporter());
    } else if (exporterType === "otlp") {
      // Determine the protocol for OTLP exporter
      const protocol = process.env.OTEL_EXPORTER_OTLP_LOGS_PROTOCOL?.trim() ||
        process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim();
      switch (protocol) {
        case "grpc":
          exporters.push(new Pv0.OTLPLogExporter());
          break;
        case "http/json":
          exporters.push(new Sv0.OTLPLogExporter());
          break;
        case "http/protobuf":
          exporters.push(new Tv0.OTLPLogExporter());
          break;
        default:
          // Throw error for unknown protocol
          throw new Error(
            `Unknown protocol set in OTEL_EXPORTER_OTLP_LOGS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${protocol}`
          );
      }
    } else {
      // Throw error for unknown exporter type
      throw new Error(
        `Unknown exporter type set in OTEL_LOGS_EXPORTER env var: ${exporterType}`
      );
    }
  }

  return exporters;
}

module.exports = getConfiguredOtelLogExporters;