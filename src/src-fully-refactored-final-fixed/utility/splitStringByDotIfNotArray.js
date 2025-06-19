/**
 * Splits a string by the '.' character unless the input is already an array.
 *
 * @param {string|Array} value - The value to split or return as-is if already an array.
 * @returns {Array|string} The original array if input is an array, otherwise the split string as an array.
 */
function splitStringByDotIfNotArray(value) {
  // Check if the input is already an array using isArrayUtility
  if (isArrayUtility(value)) {
    return value;
  }
  // If not an array, split the string by '.' and return the resulting array
  return value.split('.');
}

module.exports = splitStringByDotIfNotArray;