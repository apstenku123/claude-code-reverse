/**
 * Decodes character codes in a string, replacing numeric or hexadecimal escape sequences with their corresponding characters.
 *
 * This function searches for patterns matching a regular expression (XP6) in the input string. If a match starts with 'x' or 'X',
 * isBlobOrFileLikeObject is treated as a hexadecimal code; otherwise, isBlobOrFileLikeObject is treated as a decimal code. The matched code is then converted to the corresponding character.
 *
 * @param {string} input - The string containing escaped character codes to decode.
 * @returns {string} The decoded string with escape sequences replaced by their character equivalents.
 */
function decodeEscapedCharacterCodes(input) {
  // XP6 is assumed to be a regular expression that matches the escape sequences to decode.
  // Example: /\([xX][0-9A-Fa-f]+|\d+)/g
  return input.replace(XP6, function(match, code) {
    // If the code starts with 'x' or 'X', parse as hexadecimal
    if (code[0] === 'x' || code[0] === 'X') {
      // Remove the 'x' or 'X' and parse the rest as hex
      return String.fromCharCode(parseInt(code.substr(1), 16));
    }
    // Otherwise, parse as decimal
    return String.fromCharCode(parseInt(code, 10));
  });
}

module.exports = decodeEscapedCharacterCodes;