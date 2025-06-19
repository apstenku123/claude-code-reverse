/**
 * Pads the shorter of two processed strings with line breaks so that their concatenation aligns in length.
 *
 * This utility function processes two input strings using external transformation functions (trimTrailingNewlines and nC5),
 * calculates the difference in their original and processed lengths, and pads the shorter processed string
 * with line breaks to ensure the final concatenated string maintains alignment.
 *
 * @param {string} firstInput - The first input string to be processed and padded.
 * @param {string} secondInput - The second input string to be processed and padded.
 * @returns {string} The concatenation of the processed first and second strings, with appropriate padding in between.
 */
function padAndConcatenateStrings(firstInput, secondInput) {
  // Process the input strings using their respective transformation functions
  const processedFirst = trimTrailingNewlines(firstInput);
  const processedSecond = nC5(secondInput);

  // Calculate the maximum difference in length between the original and processed strings
  const paddingLength = Math.max(
    firstInput.length - processedFirst.length,
    secondInput.length - processedSecond.length
  );

  // Generate a string of line breaks to pad between the processed strings
  // The substring is taken from a string containing two line breaks, up to the required padding length
  const padding = `\n\n`.substring(0, paddingLength);

  // Concatenate the processed first string, the padding, and the processed second string
  return processedFirst + padding + processedSecond;
}

module.exports = padAndConcatenateStrings;