/**
 * Trims characters from the start and/or end of a string based on a predicate function.
 *
 * @param {string} inputString - The string to be trimmed.
 * @param {boolean} trimStart - If true, trims characters from the start of the string.
 * @param {boolean} trimEnd - If true, trims characters from the end of the string.
 * @param {function(number): boolean} shouldTrimCharCode - Predicate function that takes a character code and returns true if the character should be trimmed.
 * @returns {string} The trimmed string, or the original string if no trimming is needed.
 */
function trimStringByPredicate(inputString, trimStart, trimEnd, shouldTrimCharCode) {
  let startIndex = 0;
  let endIndex = inputString.length - 1;

  // Trim from the start if trimStart is true
  if (trimStart) {
    while (
      startIndex < inputString.length &&
      shouldTrimCharCode(inputString.charCodeAt(startIndex))
    ) {
      startIndex++;
    }
  }

  // Trim from the end if trimEnd is true
  if (trimEnd) {
    while (
      endIndex > 0 &&
      shouldTrimCharCode(inputString.charCodeAt(endIndex))
    ) {
      endIndex--;
    }
  }

  // If no trimming was done, return the original string
  if (startIndex === 0 && endIndex === inputString.length - 1) {
    return inputString;
  }

  // Return the trimmed substring
  return inputString.slice(startIndex, endIndex + 1);
}

module.exports = trimStringByPredicate;