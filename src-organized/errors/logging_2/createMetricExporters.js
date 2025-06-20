/**
 * Creates and configures metric exporters/readers based on environment variables.
 *
 * This function reads the OTEL_METRICS_EXPORTER environment variable (comma-separated list),
 * and for each exporter type (console, otlp, prometheus), isBlobOrFileLikeObject instantiates the appropriate
 * exporter class. For 'console', isBlobOrFileLikeObject wraps the export method to log resource attributes.
 * For 'otlp', isBlobOrFileLikeObject selects the protocol based on OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or
 * OTEL_EXPORTER_OTLP_PROTOCOL. For 'prometheus', isBlobOrFileLikeObject uses the Prometheus exporter.
 *
 * The function also reads OTEL_METRIC_EXPORT_INTERVAL (or falls back to TD6.toString())
 * to determine the export interval in milliseconds. All exporters that have an 'export'
 * method are wrapped in a PeriodicExportingMetricReader with the configured interval.
 *
 * @returns {Array<object>} Array of configured metric readers/exporters.
 * @throws {Error} If an unknown exporter type or protocol is specified.
 */
function createMetricExporters() {
  // Parse the list of exporter types from environment variable
  const exporterTypes = (process.env.OTEL_METRICS_EXPORTER || "")
    .trim()
    .split(",")
    .filter(Boolean);

  // Determine export interval (in milliseconds)
  const exportIntervalMillis = parseInt(
    process.env.OTEL_METRIC_EXPORT_INTERVAL || TD6.toString(),
    10
  );

  /**
   * Collects all exporter instances
   * @type {Array<object>}
   */
  const exporters = [];

  for (const exporterType of exporterTypes) {
    if (exporterType === "console") {
      // Create ConsoleMetricExporter and wrap its export method to log resource attributes
      const consoleExporter = new RD1.ConsoleMetricExporter();
      const originalExport = consoleExporter.export.bind(consoleExporter);
      consoleExporter.export = (exportData, resultCallback) => {
        if (exportData.resource && exportData.resource.attributes) {
          console.log("\n=== Resource Attributes ===");
          console.log(exportData.resource.attributes);
          console.log("===========================\n");
        }
        return originalExport(exportData, resultCallback);
      };
      exporters.push(consoleExporter);
    } else if (exporterType === "otlp") {
      // Determine OTLP protocol from environment variables
      const otlpProtocol = process.env.OTEL_EXPORTER_OTLP_METRICS_PROTOCOL?.trim() ||
        process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim();
      switch (otlpProtocol) {
        case "grpc":
          exporters.push(new Lv0.OTLPMetricExporter());
          break;
        case "http/json":
          exporters.push(new Rv0.OTLPMetricExporter());
          break;
        case "http/protobuf":
          exporters.push(new Mv0.OTLPMetricExporter());
          break;
        default:
          throw new Error(
            `Unknown protocol set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${otlpProtocol}`
          );
      }
    } else if (exporterType === "prometheus") {
      // Add Prometheus exporter
      exporters.push(new Ov0.PrometheusExporter());
    } else {
      // Unknown exporter type
      throw new Error(
        `Unknown exporter type set in OTEL_METRICS_EXPORTER env var: ${exporterType}`
      );
    }
  }

  // Wrap exporters that have an 'export' method in a PeriodicExportingMetricReader
  return exporters.map(exporterInstance => {
    if ("export" in exporterInstance) {
      return new mm1.PeriodicExportingMetricReader({
        exporter: exporterInstance,
        exportIntervalMillis
      });
    }
    return exporterInstance;
  });
}

module.exports = createMetricExporters;