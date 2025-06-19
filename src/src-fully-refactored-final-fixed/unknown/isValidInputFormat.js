/**
 * Checks if the provided input string matches either of the two allowed formats.
 *
 * @param {string} input - The input string to validate.
 * @returns {boolean} True if the input matches at least one of the allowed formats, false otherwise.
 */
function isValidInputFormat(input) {
  // Check if input matches the first allowed format
  const matchesFirstFormat = getConfiguredIteratee.test(input);
  // Check if input matches the second allowed format
  const matchesSecondFormat = getDataStoreByKeyType.test(input);
  // Return true if input matches either format
  return matchesFirstFormat || matchesSecondFormat;
}

module.exports = isValidInputFormat;