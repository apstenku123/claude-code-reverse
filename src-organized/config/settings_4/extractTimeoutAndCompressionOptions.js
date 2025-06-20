/**
 * Extracts timeout and compression options from a source observable.
 *
 * @param {Object} sourceObservable - The observable or configuration object to extract options from.
 * @returns {Object} An object containing the timeout in milliseconds and compression settings.
 */
function extractTimeoutAndCompressionOptions(sourceObservable) {
  return {
    // Extract the timeout value in milliseconds using the e06 utility
    timeoutMillis: e06(sourceObservable),
    // Extract the compression settings using the A26 utility
    compression: A26(sourceObservable)
  };
}

module.exports = extractTimeoutAndCompressionOptions;