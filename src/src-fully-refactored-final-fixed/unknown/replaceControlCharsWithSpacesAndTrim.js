/**
 * Replaces all control characters (ASCII < 32) in the input string with spaces, then trims the result.
 *
 * @param {string} input - The string to process.
 * @returns {string} The processed string with control characters replaced by spaces and trimmed.
 */
function replaceControlCharsWithSpacesAndTrim(input) {
  let result = "";
  // Iterate over each character in the input string
  for (let index = 0, length = input.length; index < length; index++) {
    const charCode = input.charCodeAt(index);
    // Replace control characters (ASCII < 32) with a space, otherwise keep the character
    result += charCode < 32 ? " " : input.charAt(index);
  }
  // Trim whitespace from both ends of the result string using tF1.trim
  return tF1.trim(result);
}

module.exports = replaceControlCharsWithSpacesAndTrim;