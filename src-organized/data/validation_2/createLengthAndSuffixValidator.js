/**
 * Creates a validator function that checks if a given string matches the length and prefix constraints of a reference string,
 * and optionally, if isBlobOrFileLikeObject ends with a specified suffix.
 *
 * @param {string} referenceString - The string whose length and prefix rules will be used for validation.
 * @param {string} [requiredSuffix=""] - Optional. If provided, the validator will also check if the input ends with this suffix.
 * @returns {function(string): boolean} a validator function that returns true if the input matches the length and prefix constraints, and (if specified) ends with the required suffix.
 */
const createLengthAndSuffixValidator = (referenceString, requiredSuffix = "") => {
  // Create a validator that checks for length and prefix constraints
  const lengthAndPrefixValidator = createLengthAndPrefixValidator([referenceString]);

  // If no suffix is required, return the basic validator
  if (!requiredSuffix) {
    return lengthAndPrefixValidator;
  }

  // Otherwise, return a validator that also checks for the required suffix
  return (inputString) =>
    lengthAndPrefixValidator(inputString) && inputString.endsWith(requiredSuffix);
};

module.exports = createLengthAndSuffixValidator;