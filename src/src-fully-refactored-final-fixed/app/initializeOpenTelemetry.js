/**
 * Initializes and configures OpenTelemetry metrics and logging for the Claude Code application.
 * Sets up resource attributes, meter provider, log record processors, and handles graceful shutdown with timeout.
 *
 * @returns {import('opentelemetry/api').Meter} The configured OpenTelemetry Meter instance for the application.
 */
function initializeOpenTelemetry() {
  // Set up diagnostic logger for OpenTelemetry
  SD6();
  LD1.diag.setLogger(new bm1(), LD1.DiagLogLevel.ERROR);

  // Collect metric readers based on environment/configuration
  const metricReaders = [];
  if (qv0()) {
    // Add all available metric readers if enabled
    metricReaders.push(...createMetricExporters());
  }
  if (yD6()) {
    // Add a specific metric reader if enabled
    metricReaders.push(createPeriodicMetricReader());
  }

  // Define resource attributes for the service
  const serviceResource = as.resourceFromAttributes({
    [OD1.ATTR_SERVICE_NAME]: "claude-code",
    [OD1.ATTR_SERVICE_VERSION]: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    }.VERSION
  });

  // Detect environment resource attributes
  const detectedEnvResource = as.envDetector.detect();
  const envResource = as.resourceFromAttributes(detectedEnvResource.attributes || {});

  // Merge service and environment resources
  const mergedResource = serviceResource.merge(envResource);

  // Create the MeterProvider with the merged resource and metric readers
  const meterProvider = new RD1.MeterProvider({
    resource: mergedResource,
    views: [],
    readers: metricReaders
  });

  // If metric readers are enabled, set up logging
  if (qv0()) {
    const logRecordProcessors = getConfiguredOtelLogExporters();
    if (logRecordProcessors.length > 0) {
      // Create a LoggerProvider with the merged resource
      const loggerProvider = new Bh.LoggerProvider({
        resource: mergedResource
      });

      // Add all log record processors with batch processing and configurable interval
      for (const processor of logRecordProcessors) {
        loggerProvider.addLogRecordProcessor(
          new Bh.BatchLogRecordProcessor(processor, {
            scheduledDelayMillis: parseInt(
              process.env.OTEL_LOGS_EXPORT_INTERVAL || PD6.toString()
            )
          })
        );
      }

      // Set the global logger provider and perform any additional setup
      hm1.logs.setGlobalLoggerProvider(loggerProvider);
      setLoggerProvider(loggerProvider);

      // Get the application logger and perform any additional setup
      const appLogger = hm1.logs.getLogger("com.anthropic.claude_code.events", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
        VERSION: "1.0.19"
      }.VERSION);
      setEventLogger(appLogger);
    }
  }

  // Register a shutdown handler for OpenTelemetry providers with a timeout
  QZ0(async () => {
    const shutdownTimeoutMs = parseInt(
      process.env.CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS || "1000"
    );
    try {
      // Prepare shutdown promises for meter and logger providers
      const shutdownPromises = [meterProvider.shutdown()];
      const loggerProvider = k0A();
      if (loggerProvider) {
        shutdownPromises.push(loggerProvider.shutdown());
      }
      // Race between all shutdowns and a timeout
      await Promise.race([
        Promise.all(shutdownPromises),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("OpenTelemetry shutdown timeout")),
            shutdownTimeoutMs
          )
        )
      ]);
    } catch (shutdownError) {
      // If shutdown times out, print helpful instructions
      if (
        shutdownError instanceof Error &&
        shutdownError.message.includes("timeout")
      ) {
        HG(`
OpenTelemetry telemetry flush timed out after ${shutdownTimeoutMs}ms

To resolve this issue, you can:
1. Increase the timeout by setting CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS env var (e.g., 5000 for 5 seconds)
2. Check if your OpenTelemetry backend is experiencing scalability issues
3. Disable OpenTelemetry by unsetting CLAUDE_CODE_ENABLE_TELEMETRY env var

Current timeout: ${shutdownTimeoutMs}ms
`);
      }
      throw shutdownError;
    }
  });

  // Return the application meter for use in metrics collection
  return meterProvider.getMeter("com.anthropic.claude_code", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  }.VERSION);
}

module.exports = initializeOpenTelemetry;