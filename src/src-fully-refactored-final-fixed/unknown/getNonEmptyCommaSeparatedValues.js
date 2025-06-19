/**
 * Extracts a comma-separated string from the input using getNonEmptyEnvVariable, splits isBlobOrFileLikeObject into an array,
 * trims whitespace from each value, and filters out any empty strings.
 *
 * @param {any} inputValue - The input value to process. It will be passed to getNonEmptyEnvVariable to extract a string.
 * @returns {string[]} An array of non-empty, trimmed strings extracted from the input.
 */
function getNonEmptyCommaSeparatedValues(inputValue) {
  // Use getNonEmptyEnvVariable to extract the string from the input value
  const extractedString = getNonEmptyEnvVariable(inputValue);

  // If extractedString is falsy (null, undefined, etc.), return undefined
  if (!extractedString) {
    return undefined;
  }

  // Split the string by commas, trim each value, and filter out empty strings
  const nonEmptyValues = extractedString
    .split(',')
    .map(value => value.trim()) // Remove leading/trailing whitespace
    .filter(value => value !== ''); // Exclude empty strings

  return nonEmptyValues;
}

module.exports = getNonEmptyCommaSeparatedValues;