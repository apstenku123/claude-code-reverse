/**
 * Processes a character code during HTML tag parsing, updating parser state and buffers as needed.
 *
 * @param {number} charCode - The character code to process (e.g., from input stream).
 * @returns {void}
 *
 * This function updates the tagNameBuffer and tagCharCodes arrays for valid tag name characters,
 * handles whitespace and special characters (like '/', '>'), and manages parser state transitions.
 */
function handleHtmlTagCharacter(charCode) {
  switch (charCode) {
    // Whitespace characters: tab, line feed, form feed, space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      if (isTagNameBufferNonEmpty(tagNameBuffer)) {
        parserState = STATE_BEFORE_ATTRIBUTE_NAME;
        return;
      }
      break;
    // Slash '/': possible self-closing tag
    case 47:
      if (isTagNameBufferNonEmpty(tagNameBuffer)) {
        parserState = STATE_SELF_CLOSING_START_TAG;
        return;
      }
      break;
    // Greater-than '>': end of tag
    case 62:
      if (isTagNameBufferNonEmpty(tagNameBuffer)) {
        parserState = STATE_DATA;
        finalizeTag();
        return;
      }
      break;
    // Uppercase ASCII letters a-zA
    case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 74:
    case 75: case 76: case 77: case 78: case 79: case 80: case 81: case 82: case 83: case 84:
    case 85: case 86: case 87: case 88: case 89: case 90:
      // Convert to lowercase and append to tagNameBuffer
      tagNameBuffer += String.fromCharCode(charCode + 32);
      tagCharCodes.push(charCode);
      return;
    // Lowercase ASCII letters a-z
    case 97: case 98: case 99: case 100: case 101: case 102: case 103: case 104: case 105: case 106:
    case 107: case 108: case 109: case 110: case 111: case 112: case 113: case 114: case 115: case 116:
    case 117: case 118: case 119: case 120: case 121: case 122:
      tagNameBuffer += String.fromCharCode(charCode);
      tagCharCodes.push(charCode);
      return;
    default:
      break;
  }
  // For all other characters, treat as parse error and reset buffers
  tagBuffer.push(60); // '<'
  tagBuffer.push(47); // '/'
  appendCharCodesToBuffer(tagBuffer, tagCharCodes);
  handleParseError(charCode, ERROR_INVALID_TAG_CHARACTER);
}

module.exports = handleHtmlTagCharacter;
