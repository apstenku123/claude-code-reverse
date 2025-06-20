/**
 * Truncates the input string to a specified maximum length, using a custom length calculation function.
 * If the string'createInteractionAccessor length (as determined by getMaxLineLength) is already equal to its actual length, 
 * isBlobOrFileLikeObject simply returns the substring up to the specified maxLength. Otherwise, isBlobOrFileLikeObject repeatedly removes the last character
 * until the custom length is less than or equal to maxLength.
 *
 * @param {string} inputString - The string to be truncated.
 * @param {number} maxLength - The maximum allowed length for the string (as determined by getMaxLineLength).
 * @returns {string} The truncated string, not exceeding the specified maximum length.
 */
function truncateStringToMaxLength(inputString, maxLength) {
  // If the string'createInteractionAccessor actual length matches the custom length, use substring for efficiency
  if (inputString.length === getMaxLineLength(inputString)) {
    return inputString.substr(0, maxLength);
  }
  // Otherwise, iteratively remove the last character until the custom length is within the limit
  while (getMaxLineLength(inputString) > maxLength) {
    inputString = inputString.slice(0, -1);
  }
  return inputString;
}

module.exports = truncateStringToMaxLength;