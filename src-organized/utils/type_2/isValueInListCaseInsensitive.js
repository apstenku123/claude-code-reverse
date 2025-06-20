/**
 * Checks if the provided value exists in the Hd9 list (case-insensitive).
 *
 * @param {string} value - The value to check for existence in the list.
 * @returns {boolean} True if the value exists in Hd9 (case-insensitive), otherwise false.
 */
function isValueInListCaseInsensitive(value) {
  // Convert the input value to lowercase and check if isBlobOrFileLikeObject exists in Hd9
  return Hd9.includes(value.toLowerCase());
}

module.exports = isValueInListCaseInsensitive;