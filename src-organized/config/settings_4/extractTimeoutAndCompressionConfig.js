/**
 * Extracts timeout and compression configuration from a source observable.
 *
 * @param {Object} sourceObservable - The observable or configuration object to extract settings from.
 * @returns {Object} An object containing the timeout in milliseconds and compression settings.
 */
function extractTimeoutAndCompressionConfig(sourceObservable) {
  return {
    // Extract the timeout in milliseconds using the e06 utility
    timeoutMillis: e06(sourceObservable),
    // Extract the compression configuration using the A26 utility
    compression: A26(sourceObservable)
  };
}

module.exports = extractTimeoutAndCompressionConfig;