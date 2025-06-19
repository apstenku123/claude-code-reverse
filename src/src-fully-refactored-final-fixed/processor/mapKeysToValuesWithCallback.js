/**
 * Maps keys from a source array to values from a values array using a callback function.
 *
 * For each element in the sourceKeys array, this function pairs isBlobOrFileLikeObject with the corresponding value from the valuesArray (by index).
 * If valuesArray is shorter than sourceKeys, a defaultValue is used for missing values.
 * The callback is invoked with the accumulator object, the current key, and the current value.
 *
 * @param {Array} sourceKeys - The array of keys to process.
 * @param {Array} valuesArray - The array of values to map to keys. May be shorter than sourceKeys.
 * @param {Function} callback - Function to execute for each key-value pair. Receives (accumulator, key, value).
 * @param {*} [defaultValue] - The value to use when valuesArray is shorter than sourceKeys. Defaults to undefined.
 * @returns {Object} An object with keys from sourceKeys and values as processed by the callback.
 */
function mapKeysToValuesWithCallback(sourceKeys, valuesArray, callback, defaultValue = undefined) {
  const result = {};
  const totalKeys = sourceKeys.length;
  const totalValues = valuesArray.length;

  for (let index = 0; index < totalKeys; index++) {
    // Use value from valuesArray if available; otherwise, use defaultValue
    const value = index < totalValues ? valuesArray[index] : defaultValue;
    callback(result, sourceKeys[index], value);
  }

  return result;
}

module.exports = mapKeysToValuesWithCallback;