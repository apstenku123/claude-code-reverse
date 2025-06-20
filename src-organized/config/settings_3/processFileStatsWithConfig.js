/**
 * Processes file statistics for a given file path using a provided configuration.
 *
 * This function synchronously retrieves the file statistics for the specified file path
 * and then processes those statistics using a custom handler function, passing in the
 * provided configuration.
 *
 * @param {string} filePath - The path to the file whose statistics will be retrieved.
 * @param {object} config - The configuration object to be used by the handler function.
 * @returns {any} The result of processing the file statistics with the provided configuration.
 */
function processFileStatsWithConfig(filePath, config) {
  // Retrieve file statistics synchronously for the given file path
  const fileStats = Uo0.statSync(filePath);

  // Process the file statistics using the external handler and configuration
  return $o0(fileStats, config);
}

module.exports = processFileStatsWithConfig;