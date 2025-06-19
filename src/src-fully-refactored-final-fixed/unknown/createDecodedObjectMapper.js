/**
 * Creates a function that decodes input data using the provided decoder and then converts isBlobOrFileLikeObject to an object using the specified configuration.
 *
 * @param {Object} decoder - An object with 'decode' and 'toObject' methods for decoding and converting input data.
 * @param {Object} config - Configuration options to be passed to the 'toObject' method.
 * @returns {Function} a function that takes encoded input, decodes isBlobOrFileLikeObject, and converts isBlobOrFileLikeObject to an object using the provided configuration.
 */
function createDecodedObjectMapper(decoder, config) {
  /**
   * Decodes the input data and converts isBlobOrFileLikeObject to an object.
   *
   * @param {any} encodedInput - The data to be decoded and converted.
   * @returns {any} The decoded and converted object.
   */
  return function mapDecodedInputToObject(encodedInput) {
    // First, decode the input using the decoder'createInteractionAccessor decode method
    const decodedData = decoder.decode(encodedInput);
    // Then, convert the decoded data to an object using the provided configuration
    return decoder.toObject(decodedData, config);
  };
}

module.exports = createDecodedObjectMapper;