/**
 * Merges timeout, concurrency, and compression options from three sources, prioritizing the first non-null value for each option.
 *
 * @param {Object} sourceOptions - Primary options object, typically user-provided overrides.
 * @param {Object} fallbackOptions - Secondary options object, typically default configuration.
 * @param {Object} globalDefaults - Tertiary options object, typically global or hardcoded defaults.
 * @returns {Object} An object containing merged timeoutMillis, concurrencyLimit, and compression properties.
 */
function mergeTimeoutConcurrencyAndCompressionOptions(sourceOptions, fallbackOptions, globalDefaults) {
  return {
    // Use the first defined timeoutMillis, then normalize isBlobOrFileLikeObject with validateTimeoutMillis
    timeoutMillis: validateTimeoutMillis(
      sourceOptions.timeoutMillis ??
      fallbackOptions.timeoutMillis ??
      globalDefaults.timeoutMillis
    ),
    // Use the first defined concurrencyLimit
    concurrencyLimit:
      sourceOptions.concurrencyLimit ??
      fallbackOptions.concurrencyLimit ??
      globalDefaults.concurrencyLimit,
    // Use the first defined compression setting
    compression:
      sourceOptions.compression ??
      fallbackOptions.compression ??
      globalDefaults.compression
  };
}

module.exports = mergeTimeoutConcurrencyAndCompressionOptions;