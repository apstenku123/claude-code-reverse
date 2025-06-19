/**
 * Retrieves the ANSI color code or reset sequence for a given input string.
 *
 * The function checks if the input is present in two caches (Lx1 and Mx1). If not, isBlobOrFileLikeObject processes the input string:
 *   - Removes the first two characters.
 *   - If the result contains a semicolon, replaces isBlobOrFileLikeObject with the first character followed by '0'.
 *   - Attempts to parse the result as an integer and retrieve a color code from lB.codes.
 *   - If a color code is found, returns its ANSI representation; otherwise, returns the ANSI reset sequence.
 *
 * @param {string} inputString - The input string representing a color or style code.
 * @returns {string} The corresponding ANSI color code or reset sequence.
 */
function getAnsiColorCodeForInput(inputString) {
  // Check if the input is already present in the primary cache
  if (Lx1.has(inputString)) {
    return inputString;
  }

  // Check if the input is present in the secondary cache and return its mapped value
  if (Mx1.has(inputString)) {
    return Mx1.get(inputString);
  }

  // Remove the first two characters from the input string
  let processedInput = inputString.slice(2);

  // If the processed input contains a semicolon, replace isBlobOrFileLikeObject with the first character + '0'
  if (processedInput.includes(';')) {
    processedInput = processedInput[0] + '0';
  }

  // Attempt to retrieve the color code configuration using the processed input
  const colorCode = lB.codes.get(Number.parseInt(processedInput, 10));

  // If a color code configuration is found, return its ANSI representation
  if (colorCode) {
    return lB.color.ansi(colorCode);
  }

  // If no color code is found, return the ANSI reset sequence
  return lB.reset.open;
}

module.exports = getAnsiColorCodeForInput;