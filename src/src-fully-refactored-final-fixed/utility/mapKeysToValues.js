/**
 * Maps each key from the provided keys array to a corresponding value from the values array using a callback function.
 * If the values array is shorter than the keys array, a default value is used for missing values.
 *
 * @param {Array} keys - The array of keys to map.
 * @param {Array} values - The array of values to assign to the keys.
 * @returns {Object} An object mapping each key to its corresponding value.
 */
function mapKeysToValues(keys, values) {
  // Use empty arrays as defaults if parameters are not provided
  const keysArray = keys || [];
  const valuesArray = values || [];

  // Delegate the mapping logic to mapKeysToValuesWithCallback
  // setNestedPropertyWithCustomizer is assumed to be the callback function used for mapping
  return mapKeysToValuesWithCallback(keysArray, valuesArray, setNestedPropertyWithCustomizer);
}

module.exports = mapKeysToValues;