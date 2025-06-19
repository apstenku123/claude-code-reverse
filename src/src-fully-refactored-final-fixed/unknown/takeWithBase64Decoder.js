/**
 * Applies the GB.take operation to the provided observable, using a base64 decoder from the configuration.
 *
 * @param {Observable} sourceObservable - The observable to apply the take operation to.
 * @param {Object} config - Configuration object containing a base64Decoder property.
 * @param {Function} config.base64Decoder - Function to decode base64-encoded bytes.
 * @returns {any} The result of the GB.take operation.
 */
const takeWithBase64Decoder = (sourceObservable, config) => {
  // Pass the base64Decoder from config as the 'bytes' option to GB.take
  return GB.take(sourceObservable, {
    bytes: config.base64Decoder
  });
};

module.exports = takeWithBase64Decoder;
