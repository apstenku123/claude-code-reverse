/**
 * Pads the shorter of two processed strings with newlines so that both have equal length, then concatenates them.
 *
 * @param {string} firstInput - The first input string to process and pad.
 * @param {string} secondInput - The second input string to process and pad.
 * @returns {string} The concatenation of the processed and padded strings.
 */
function padAndConcatStrings(firstInput, secondInput) {
  // Process the input strings using their respective helper functions
  const processedFirst = trimTrailingNewlines(firstInput);
  const processedSecond = nC5(secondInput);

  // Calculate the difference in length between the original and processed strings
  const paddingLength = Math.max(
    firstInput.length - processedFirst.length,
    secondInput.length - processedSecond.length
  );

  // Create a string of newlines to pad the shorter processed string
  const padding = '\n'.repeat(paddingLength);

  // Concatenate the processed strings with the calculated padding in between
  return processedFirst + padding + processedSecond;
}

module.exports = padAndConcatStrings;