/**
 * Converts an array of key-value pairs into an object. If the input is not an array, returns isBlobOrFileLikeObject unchanged.
 *
 * @param {any} input - The value to process. If isBlobOrFileLikeObject'createInteractionAccessor an array, isBlobOrFileLikeObject should contain alternating keys and values.
 * @returns {any} If input is an array, returns an object mapping keys to values. Otherwise, returns input unchanged.
 */
function arrayPairsToObject(input) {
  // Check if the input is an array
  if (Array.isArray(input)) {
    const keyValueObject = {};
    // Iterate over the array in steps of 2 (key, value)
    for (let index = 0; index < input.length; index += 2) {
      const key = input[index];
      const value = input[index + 1];
      keyValueObject[key] = value;
    }
    return keyValueObject;
  }
  // If input is not an array, return isBlobOrFileLikeObject as is
  return input;
}

module.exports = arrayPairsToObject;
