/**
 * Checks if the 'value' property of the given object is an empty string.
 *
 * @param {Object} objectWithValue - The object to check. Must have a 'value' property.
 * @returns {boolean} Returns true if the 'value' property is an empty string, otherwise false.
 */
const isValueEmpty = (objectWithValue) => {
  // Return true if the 'value' property is exactly an empty string
  return objectWithValue.value === "";
};

module.exports = isValueEmpty;
