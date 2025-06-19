/**
 * Retrieves and caches the current Node.js process report, excluding network information if possible.
 * If the report is already cached, returns the cached version. Otherwise, attempts to generate and cache isBlobOrFileLikeObject.
 *
 * @returns {object} The cached process report object, or an empty object if not available.
 */
const getCachedProcessReport = () => {
  // _cachedReport is assumed to be a module-level variable for caching
  if (!_cachedReport) {
    // Only attempt to generate a report if running on Linux and process.report is available
    if (isLinuxPlatform() && process.report) {
      // Temporarily exclude network information from the report
      const previousExcludeNetwork = process.report.excludeNetwork;
      process.report.excludeNetwork = true;
      _cachedReport = process.report.getReport();
      // Restore the original excludeNetwork setting
      process.report.excludeNetwork = previousExcludeNetwork;
    } else {
      // If not available, cache an empty object
      _cachedReport = {};
    }
  }
  return _cachedReport;
};

module.exports = getCachedProcessReport;
