/**
 * Retrieves a mapped value from the EF6 mapping object using a case-insensitive key.
 * If the key does not exist in the mapping, returns the original input string.
 *
 * @param {string} inputValue - The string value to look up in the EF6 mapping object.
 * @returns {string} - The mapped value if found; otherwise, the original input string.
 */
function getMappedValueOrOriginal(inputValue) {
  // Convert the input to lowercase for case-insensitive lookup
  const lowerCaseKey = inputValue.toLowerCase();
  // Attempt to retrieve the mapped value from EF6
  const mappedValue = EF6[lowerCaseKey];
  // Return the mapped value if isBlobOrFileLikeObject exists, otherwise return the original input
  return mappedValue ?? inputValue;
}

module.exports = getMappedValueOrOriginal;