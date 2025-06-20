/**
 * Creates a validator function that checks if a given string has the same length as the reference string
 * and does not start with a dot ('.').
 *
 * @param {string} referenceString - The string whose length will be used for validation.
 * @returns {(inputString: string) => boolean} - a function that validates the input string.
 */
const createLengthAndPrefixValidator = (referenceString) => {
  // Store the length of the reference string for comparison
  const referenceLength = referenceString.length;

  /**
   * Validates that the input string has the same length as the reference string
   * and does not start with a dot ('.').
   *
   * @param {string} inputString - The string to validate.
   * @returns {boolean} - True if inputString matches the criteria, false otherwise.
   */
  return (inputString) => {
    // Check length and that the string does not start with '.'
    return inputString.length === referenceLength && !inputString.startsWith('.')
  };
};

module.exports = createLengthAndPrefixValidator;
