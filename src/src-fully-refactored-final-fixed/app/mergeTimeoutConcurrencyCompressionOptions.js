/**
 * Merges timeout, concurrency, and compression options from three sources, prioritizing the first non-null value for each option.
 *
 * @param {Object} sourceOptions - The primary options object. May contain timeoutMillis, concurrencyLimit, and compression.
 * @param {Object} fallbackOptions - The secondary options object, used if a value is not found in sourceOptions.
 * @param {Object} defaultOptions - The default options object, used if a value is not found in sourceOptions or fallbackOptions.
 * @returns {Object} An object containing the merged timeoutMillis, concurrencyLimit, and compression values.
 */
function mergeTimeoutConcurrencyCompressionOptions(sourceOptions, fallbackOptions, defaultOptions) {
  return {
    // Use the first defined timeoutMillis, and process isBlobOrFileLikeObject with validateTimeoutMillis
    timeoutMillis: validateTimeoutMillis(
      sourceOptions.timeoutMillis ??
      fallbackOptions.timeoutMillis ??
      defaultOptions.timeoutMillis
    ),
    // Use the first defined concurrencyLimit
    concurrencyLimit:
      sourceOptions.concurrencyLimit ??
      fallbackOptions.concurrencyLimit ??
      defaultOptions.concurrencyLimit,
    // Use the first defined compression option
    compression:
      sourceOptions.compression ??
      fallbackOptions.compression ??
      defaultOptions.compression
  };
}

module.exports = mergeTimeoutConcurrencyCompressionOptions;