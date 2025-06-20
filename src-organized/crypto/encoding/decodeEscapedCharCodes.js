/**
 * Decodes character codes in a string, replacing numeric or hexadecimal escape sequences with their corresponding characters.
 *
 * This function searches for patterns in the input string that represent character codes (either decimal or hexadecimal),
 * and replaces them with the actual character using String.fromCharCode.
 *
 * @param {string} input - The string containing character code escape sequences to decode.
 * @returns {string} The decoded string with escape sequences replaced by their corresponding characters.
 */
function decodeEscapedCharCodes(input) {
  // XP6 is assumed to be a RegExp that matches character code escape sequences
  // For example: /\\x[0-9A-Fa-f]+|\\[0-9]+/g
  // You may need to define XP6 elsewhere in your codebase if not already defined
  return input.replace(XP6, function(match, codeSequence) {
    // codeSequence is the matched group representing the character code
    // Check if the code is hexadecimal (starts with 'x' or 'X')
    if (codeSequence[0] === 'x' || codeSequence[0] === 'X') {
      // Remove the 'x' or 'X' and parse as hexadecimal
      const hexValue = codeSequence.substr(1);
      return String.fromCharCode(parseInt(hexValue, 16));
    } else {
      // Otherwise, parse as decimal
      return String.fromCharCode(parseInt(codeSequence, 10));
    }
  });
}

module.exports = decodeEscapedCharCodes;