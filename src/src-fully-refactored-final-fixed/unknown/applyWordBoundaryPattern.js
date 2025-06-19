/**
 * Applies a word boundary or non-word boundary regex pattern based on the input string.
 *
 * This function determines whether the input string ends with a word character. If isBlobOrFileLikeObject does,
 * isBlobOrFileLikeObject uses a word boundary (\b) regex; otherwise, isBlobOrFileLikeObject uses a non-word boundary (\b) regex.
 * It then calls the external function `y8` with the appropriate regex patterns and the input string.
 *
 * @param {string} inputString - The string to test and process with regex boundaries.
 * @returns {any} The result of the `y8` function, which processes the input string with the selected regex patterns.
 */
const applyWordBoundaryPattern = (inputString) => {
  // Regex to match a word boundary
  const wordBoundaryRegex = /\b/;
  // Regex to test if the string ends with a word character
  const endsWithWordCharRegex = /\w$/;
  // Regex to match a non-word boundary
  const nonWordBoundaryRegex = /\b/;

  // Determine which boundary regex to use based on the last character of the input string
  const boundaryRegex = endsWithWordCharRegex.test(inputString)
    ? wordBoundaryRegex
    : nonWordBoundaryRegex;

  // Call the external function y8 with the selected regexes and the input string
  return y8(wordBoundaryRegex, inputString, boundaryRegex);
};

module.exports = applyWordBoundaryPattern;
