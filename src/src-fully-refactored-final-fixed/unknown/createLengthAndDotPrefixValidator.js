/**
 * Checks if a given string has the same length as a reference string and does not start with a dot ('.').
 *
 * @param {string[]} referenceArray - An array whose length will be used as the reference for validation.
 * @returns {(inputString: string) => boolean} - a validator function that checks if the input string matches the reference length and does not start with a dot.
 */
const createLengthAndDotPrefixValidator = ([referenceString]) => {
  // Store the length of the reference string for later comparison
  const referenceLength = referenceString.length;

  /**
   * Validates that the input string has the same length as the reference and does not start with a dot.
   * @param {string} inputString - The string to validate.
   * @returns {boolean} - True if inputString matches the reference length and does not start with a dot, false otherwise.
   */
  return (inputString) => {
    // Check both conditions: length matches and does not start with '.'
    return inputString.length === referenceLength && !inputString.startsWith('.')
  };
};

module.exports = createLengthAndDotPrefixValidator;
