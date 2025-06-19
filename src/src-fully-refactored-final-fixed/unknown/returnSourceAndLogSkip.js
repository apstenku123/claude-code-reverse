/**
 * Logs a message if a logger function is provided, indicating that a specific configuration was detected
 * and the search for a globally-installed libvips is being skipped. Returns the provided source value.
 *
 * @param {any} sourceValue - The value to return (typically an observable or result object).
 * @param {string} detectedConfig - The configuration or library that was detected (e.g., a local libvips path).
 * @param {function} [logger] - Optional logger function to output informational messages.
 * @returns {any} Returns the sourceValue unchanged.
 */
const returnSourceAndLogSkip = (sourceValue, detectedConfig, logger) => {
  // If a logger is provided, log the skip message
  if (logger) {
    logger(`Detected ${detectedConfig}, skipping search for globally-installed libvips`);
  }
  // Always return the source value
  return sourceValue;
};

module.exports = returnSourceAndLogSkip;
