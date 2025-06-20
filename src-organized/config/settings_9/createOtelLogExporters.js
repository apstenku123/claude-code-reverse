/**
 * Creates and returns an array of OpenTelemetry log exporter instances based on environment variables.
 *
 * This function reads the OTEL_LOGS_EXPORTER environment variable to determine which log exporters
 * should be instantiated. Supported exporters are 'console' and 'otlp'. For 'otlp', the protocol is
 * determined by the OTEL_EXPORTER_OTLP_LOGS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL environment variables.
 *
 * @returns {Array<object>} An array of log exporter instances as specified by the environment variables.
 * @throws {Error} If an unknown exporter type or protocol is specified in the environment variables.
 */
function createOtelLogExporters() {
  // Read and parse the OTEL_LOGS_EXPORTER environment variable, splitting by comma and removing empty values
  const exporterTypes = (process.env.OTEL_LOGS_EXPORTER || "").trim().split(",").filter(Boolean);
  const exporters = [];

  for (const exporterType of exporterTypes) {
    if (exporterType === "console") {
      // Add ConsoleLogRecordExporter if 'console' is specified
      exporters.push(new Bh.ConsoleLogRecordExporter());
    } else if (exporterType === "otlp") {
      // Determine the OTLP protocol from environment variables
      const otlpProtocol = process.env.OTEL_EXPORTER_OTLP_LOGS_PROTOCOL?.trim() ||
        process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim();
      switch (otlpProtocol) {
        case "grpc":
          // Use gRPC protocol
          exporters.push(new Pv0.OTLPLogExporter());
          break;
        case "http/json":
          // Use HTTP/JSON protocol
          exporters.push(new Sv0.OTLPLogExporter());
          break;
        case "http/protobuf":
          // Use HTTP/Protobuf protocol
          exporters.push(new Tv0.OTLPLogExporter());
          break;
        default:
          // Unknown protocol specified
          throw new Error(
            `Unknown protocol set in OTEL_EXPORTER_OTLP_LOGS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${otlpProtocol}`
          );
      }
    } else {
      // Unknown exporter type specified
      throw new Error(
        `Unknown exporter type set in OTEL_LOGS_EXPORTER env var: ${exporterType}`
      );
    }
  }

  return exporters;
}

module.exports = createOtelLogExporters;
