/**
 * Creates and returns an array of log exporter instances based on environment variables.
 *
 * This function reads the OTEL_LOGS_EXPORTER environment variable, which should be a comma-separated list
 * of exporter types (e.g., "console,otlp"). For each exporter type, isBlobOrFileLikeObject instantiates the appropriate exporter:
 *   - "console": Instantiates Bh.ConsoleLogRecordExporter
 *   - "otlp": Reads the protocol from OTEL_EXPORTER_OTLP_LOGS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL and
 *     instantiates the corresponding OTLP exporter (Pv0, Sv0, or Tv0)
 *
 * Throws an error if an unknown exporter type or protocol is specified.
 *
 * @returns {Array<object>} An array of instantiated log exporter objects
 * @throws {Error} If an unknown exporter type or protocol is specified
 */
function createLogExportersFromEnv() {
  // Read and parse the OTEL_LOGS_EXPORTER environment variable
  const exporterTypes = (process.env.OTEL_LOGS_EXPORTER || "")
    .trim()
    .split(",")
    .filter(Boolean); // Remove empty strings

  const exporters = [];

  for (const exporterType of exporterTypes) {
    if (exporterType === "console") {
      // Instantiate the console log exporter
      exporters.push(new Bh.ConsoleLogRecordExporter());
    } else if (exporterType === "otlp") {
      // Determine the OTLP protocol from environment variables
      const otlpProtocol = process.env.OTEL_EXPORTER_OTLP_LOGS_PROTOCOL?.trim() ||
        process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim();

      switch (otlpProtocol) {
        case "grpc":
          // Instantiate the gRPC OTLP log exporter
          exporters.push(new Pv0.OTLPLogExporter());
          break;
        case "http/json":
          // Instantiate the HTTP/JSON OTLP log exporter
          exporters.push(new Sv0.OTLPLogExporter());
          break;
        case "http/protobuf":
          // Instantiate the HTTP/Protobuf OTLP log exporter
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

module.exports = createLogExportersFromEnv;
