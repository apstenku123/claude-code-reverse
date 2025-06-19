/**
 * Processes a character code input and updates parser state accordingly.
 *
 * This function is typically used in a parser or lexer to handle different character codes
 * (such as whitespace, slashes, angle brackets, uppercase letters, etc.) and update the parsing
 * state, buffer, or trigger actions as needed.
 *
 * @param {number} charCode - The Unicode code point of the character to process.
 * @returns {void}
 */
function handleCharacterCodeInput(charCode) {
  switch (charCode) {
    // Whitespace characters: Tab, Line Feed, Form Feed, Space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      parserState = whitespaceState;
      break;
    // Forward slash '/'
    case 47:
      parserState = slashState;
      break;
    // Greater-than sign '>'
    case 62:
      parserState = tagCloseState;
      handleTagClose();
      break;
    // Uppercase letters 'a' (65) to 'zA' (90)
    case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 74:
    case 75: case 76: case 77: case 78: case 79: case 80: case 81: case 82: case 83: case 84:
    case 85: case 86: case 87: case 88: case 89: case 90:
      // Convert uppercase to lowercase and append to buffer
      parseBuffer += String.fromCharCode(charCode + 32);
      break;
    // Null character
    case 0:
      // Append Unicode replacement character
      parseBuffer += String.fromCharCode(65533);
      break;
    // End of input
    case -1:
      handleEndOfInput();
      break;
    // Any other character
    default:
      parseBuffer += getReplacementCharacter(defaultReplacementCode);
      break;
  }
}

module.exports = handleCharacterCodeInput;