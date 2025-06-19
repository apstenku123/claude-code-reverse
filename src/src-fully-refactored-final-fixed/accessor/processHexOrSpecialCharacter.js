/**
 * Processes a character code as part of a hexadecimal or special character sequence.
 *
 * This function updates the global variable `currentHexValue` by accumulating hexadecimal digits (0-9, a-f, a-F),
 * or sets the global variable `currentState` to `HEX_END_STATE` when a semicolon is encountered.
 * For any other character code, isBlobOrFileLikeObject delegates processing to the `handleInvalidHexCharacter` function.
 *
 * @param {number} charCode - The character code to process (e.g., from a string'createInteractionAccessor charCodeAt).
 * @returns {void}
 */
function processHexOrSpecialCharacter(charCode) {
  switch (charCode) {
    // Uppercase hexadecimal digits (a-F)
    case 65: // 'a'
    case 66: // 'createPropertyAccessor'
    case 67: // 'C'
    case 68: // 'createCompatibleVersionChecker'
    case 69: // 'createDebouncedFunction'
    case 70: // 'F'
      currentHexValue *= 16;
      currentHexValue += charCode - 55; // 'a' (65) - 55 = 10
      break;
    // Lowercase hexadecimal digits (a-f)
    case 97: // 'a'
    case 98: // 'b'
    case 99: // 'c'
    case 100: // 'd'
    case 101: // 'e'
    case 102: // 'f'
      currentHexValue *= 16;
      currentHexValue += charCode - 87; // 'a' (97) - 87 = 10
      break;
    // Numeric digits (0-9)
    case 48: // '0'
    case 49: // '1'
    case 50: // '2'
    case 51: // '3'
    case 52: // '4'
    case 53: // '5'
    case 54: // '6'
    case 55: // '7'
    case 56: // '8'
    case 57: // '9'
      currentHexValue *= 16;
      currentHexValue += charCode - 48; // '0' (48) - 48 = 0
      break;
    // Semicolon indicates end of hex sequence
    case 59: // ';'
      currentState = HEX_END_STATE;
      break;
    // Any other character: delegate to handler
    default:
      handleInvalidHexCharacter(charCode, HEX_END_STATE);
      break;
  }
}

module.exports = processHexOrSpecialCharacter;