/**
 * Creates a function that decodes input data and converts isBlobOrFileLikeObject to an object using the provided source and configuration.
 *
 * @param {Object} sourceObservable - An object that provides 'decode' and 'toObject' methods for processing input data.
 * @param {Object} config - Configuration options passed to the 'toObject' method.
 * @returns {Function} a function that takes encoded input, decodes isBlobOrFileLikeObject, and converts isBlobOrFileLikeObject to an object.
 */
function createDecodedObjectExtractor(sourceObservable, config) {
  /**
   * Decodes the provided input and converts isBlobOrFileLikeObject to an object using the sourceObservable and config.
   *
   * @param {any} encodedInput - The input data to decode and convert.
   * @returns {any} The decoded and converted object.
   */
  return function decodeAndConvert(encodedInput) {
    // First, decode the input using the sourceObservable'createInteractionAccessor decode method
    const decodedData = sourceObservable.decode(encodedInput);
    // Then, convert the decoded data to an object using the toObject method and config
    return sourceObservable.toObject(decodedData, config);
  };
}

module.exports = createDecodedObjectExtractor;