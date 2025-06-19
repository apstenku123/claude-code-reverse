/**
 * Creates and returns a PeriodicExportingMetricReader configured with a default exporter and interval.
 *
 * This function instantiates a new exporter (using gm1), then creates a PeriodicExportingMetricReader
 * from the mm1 module, passing the exporter and a fixed export interval of 60 seconds (60000 ms).
 *
 * @returns {mm1.PeriodicExportingMetricReader} An instance of PeriodicExportingMetricReader configured with the exporter and interval.
 */
function createPeriodicMetricReader() {
  // Instantiate the metric exporter (implementation provided by gm1)
  const metricExporter = new gm1();

  // Create a PeriodicExportingMetricReader with the exporter and a 60-second interval
  return new mm1.PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 60000 // Export metrics every 60 seconds
  });
}

module.exports = createPeriodicMetricReader;