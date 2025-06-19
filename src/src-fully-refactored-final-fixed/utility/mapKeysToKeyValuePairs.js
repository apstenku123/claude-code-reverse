/**
 * Maps each key from the provided keys array to a [key, value] pair from the source object.
 *
 * @param {Object} sourceObject - The object from which to retrieve values.
 * @param {Array<string>} keysArray - An array of keys to map from the source object.
 * @returns {Array<Array>} An array of [key, value] pairs for each key in keysArray.
 */
function mapKeysToKeyValuePairs(sourceObject, keysArray) {
  // Use mapArray to iterate over each key and return a [key, value] pair
  return mapArray(keysArray, function(key) {
    return [key, sourceObject[key]];
  });
}

module.exports = mapKeysToKeyValuePairs;