/**
 * Maps keys and values from two arrays into an object using a callback function.
 *
 * Iterates over the keysArray, pairing each key with a corresponding value from valuesArray (if available),
 * and applies the callback to build the result object. If valuesArray is shorter than keysArray, the fallbackValue
 * is used for missing values.
 *
 * @param {Array} keysArray - The array of keys to iterate over.
 * @param {Array} valuesArray - The array of values to pair with keys.
 * @param {Function} callback - The function to apply for each key-value pair. Receives (resultObject, key, value).
 * @param {*} [fallbackValue=undefined] - The value to use if valuesArray is shorter than keysArray.
 * @returns {Object} The resulting object after mapping keys and values with the callback.
 */
function mapKeysAndValuesWithCallback(keysArray, valuesArray, callback, fallbackValue = undefined) {
  const resultObject = {};
  const totalKeys = keysArray.length;
  const totalValues = valuesArray.length;

  // Iterate over all keys
  for (let index = 0; index < totalKeys; index++) {
    // Use value from valuesArray if available, otherwise fallbackValue
    const value = index < totalValues ? valuesArray[index] : fallbackValue;
    // Apply the callback to build the result object
    callback(resultObject, keysArray[index], value);
  }

  return resultObject;
}

module.exports = mapKeysAndValuesWithCallback;