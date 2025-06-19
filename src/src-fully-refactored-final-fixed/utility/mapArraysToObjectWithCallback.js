/**
 * Maps two arrays (keys and values) into an object using a provided callback function.
 * If the values array is shorter than the keys array, a fallback value is used.
 *
 * @param {Array} keysArray - The array of keys to use for the resulting object.
 * @param {Array} valuesArray - The array of values to map to the keys.
 * @returns {Object} An object created by mapping keys to values using the callback.
 */
function mapArraysToObjectWithCallback(keysArray, valuesArray) {
  // Use empty arrays if parameters are undefined or null
  const safeKeysArray = keysArray || [];
  const safeValuesArray = valuesArray || [];

  // mapKeysAndValuesWithCallback is an imported utility: mapKeysAndValuesWithCallback
  // setNestedPropertyWithCustomizer is the callback used for mapping (assumed to be imported)
  return mapKeysAndValuesWithCallback(safeKeysArray, safeValuesArray, setNestedPropertyWithCustomizer);
}

module.exports = mapArraysToObjectWithCallback;