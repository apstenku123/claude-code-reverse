/**
 * Extracts a specified number of bytes from the provided observable source using a base64 decoder.
 *
 * @param {Observable} sourceObservable - The observable source to extract bytes from.
 * @param {Object} config - Configuration object containing decoding options.
 * @param {Function} config.base64Decoder - Function to decode base64-encoded data.
 * @returns {any} The result of the GB.take operation, which processes the observable with the provided decoder.
 */
const takeBytesWithBase64Decoder = (sourceObservable, config) => {
  // Pass the observable and decoding options to GB.take for processing
  return GB.take(sourceObservable, {
    bytes: config.base64Decoder
  });
};

module.exports = takeBytesWithBase64Decoder;
