/**
 * Replaces all control characters (ASCII < 32) in the input string with spaces, then trims the result.
 *
 * @param {string} input - The string to process.
 * @returns {string} The processed string with control characters replaced by spaces and trimmed.
 */
function replaceControlCharsAndTrim(input) {
  let result = "";
  // Iterate through each character in the input string
  for (let index = 0, length = input.length; index < length; index++) {
    const charCode = input.charCodeAt(index);
    // If the character is a control character (ASCII < 32), replace with a space
    if (charCode < 32) {
      result += " ";
    } else {
      result += input.charAt(index);
    }
  }
  // Use tF1.trim to trim whitespace from the result string
  return tF1.trim(result);
}

module.exports = replaceControlCharsAndTrim;