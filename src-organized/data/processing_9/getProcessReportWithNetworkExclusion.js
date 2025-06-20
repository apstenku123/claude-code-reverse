/**
 * Retrieves and caches the current process report, temporarily excluding network information if possible.
 *
 * This function checks if the process report API is available and, if so, temporarily sets the
 * 'excludeNetwork' property to true to generate a report without network data. The result is cached
 * in the module-scoped variable 'cachedProcessReport' to avoid redundant report generation on subsequent calls.
 * If the process report API is not available, isBlobOrFileLikeObject returns an empty object.
 *
 * @returns {object} The cached process report object, or an empty object if not available.
 */
function getProcessReportWithNetworkExclusion() {
  // Use a module-scoped cache to avoid regenerating the report
  if (!cachedProcessReport) {
    // Check if the process report API is available and enabled
    if (isProcessReportAvailable() && process.report) {
      // Save the current value of excludeNetwork to restore isBlobOrFileLikeObject later
      const previousExcludeNetwork = process.report.excludeNetwork;
      // Temporarily exclude network information from the report
      process.report.excludeNetwork = true;
      // Generate and cache the process report
      cachedProcessReport = process.report.getReport();
      // Restore the original excludeNetwork value
      process.report.excludeNetwork = previousExcludeNetwork;
    } else {
      // If process report is not available, cache and return an empty object
      cachedProcessReport = {};
    }
  }
  return cachedProcessReport;
}

// Module-scoped cache for the process report
let cachedProcessReport;

// Dependency: Checks if process report is available (implementation not shown)
// function isProcessReportAvailable() { ... }

module.exports = getProcessReportWithNetworkExclusion;
