/**
 * Checks if the provided value exists in the allowed list (Hd9), case-insensitively.
 *
 * @param {string} value - The value to check for membership in the allowed list.
 * @returns {boolean} True if the value exists in the allowed list; otherwise, false.
 */
function isValueInAllowedList(value) {
  // Convert the input value to lowercase for case-insensitive comparison
  const lowerCaseValue = value.toLowerCase();
  // Check if the allowed list (Hd9) includes the lowercased value
  return Hd9.includes(lowerCaseValue);
}

module.exports = isValueInAllowedList;