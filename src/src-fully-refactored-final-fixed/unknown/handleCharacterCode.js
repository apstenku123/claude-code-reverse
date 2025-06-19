/**
 * Processes a character code according to parsing rules, updating parser state and output buffer.
 *
 * Handles whitespace, special characters, uppercase ASCII letters, null, and end-of-input cases.
 *
 * @param {number} charCode - The Unicode code point of the character to process.
 * @returns {void}
 */
function handleCharacterCode(charCode) {
  switch (charCode) {
    // Whitespace characters: TAB, LF, FF, SPACE
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      parserState = whitespaceState;
      break;

    // '>' character (ASCII 62)
    case 62:
      parserState = tagCloseState;
      advanceParser();
      break;

    // Uppercase ASCII letters 'a' (65) to 'zA' (90)
    case 65:  // 'a'
    case 66:  // 'createPropertyAccessor'
    case 67:  // 'C'
    case 68:  // 'createCompatibleVersionChecker'
    case 69:  // 'createDebouncedFunction'
    case 70:  // 'F'
    case 71:  // 'extractNestedPropertyOrArray'
    case 72:  // 'H'
    case 73:  // 'createObjectTracker'
    case 74:  // 'streamAsyncIterableToWritable'
    case 75:  // 'sendHttpRequestOverSocket'
    case 76:  // 'createRefCountedMulticastOperator'
    case 77:  // 'M'
    case 78:  // 'operateWithLeadingTrailing'
    case 79:  // 'createDebouncedFunction'
    case 80:  // 'initializeSyntaxHighlighting'
    case 81:  // 'deepCloneWithCycleDetection'
    case 82:  // 'isWildcardOrX'
    case 83:  // 's'
    case 84:  // 'BugReportForm'
    case 85:  // 'UL'
    case 86:  // 'renderToolUseConfirmationDialog'
    case 87:  // 'W'
    case 88:  // 'X'
    case 89:  // 'processCssDeclarations'
    case 90:  // 'zA'
      // Convert uppercase to lowercase by adding 32 and push to output buffer
      outputBuffer.push(charCode + 32);
      break;

    // NULL character
    case 0:
      // Push Unicode replacement character
      outputBuffer.push(65533);
      break;

    // End-of-input indicator
    case -1:
      handleEndOfInput();
      advanceParser();
      finalizeParsing();
      break;

    // All other characters
    default:
      outputBuffer.push(charCode);
      break;
  }
}

module.exports = handleCharacterCode;