/**
 * Processes a single character code input and updates the parser state accordingly.
 *
 * Handles whitespace, special control codes, uppercase ASCII letters, and default cases.
 *
 * @param {number} charCode - The character code to process (e.g., from user input or a parser).
 * @returns {void}
 */
function handleInputCharacter(charCode) {
  switch (charCode) {
    // Whitespace characters: Tab, Line Feed, Form Feed, Space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      parserState = whitespaceState;
      break;

    // '>' character (ASCII 62)
    case 62:
      parserState = tagCloseState;
      insertTextAtCursor();
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
      // Convert uppercase ASCII to lowercase by adding 32, then push to output buffer
      outputBuffer.push(charCode + 32);
      break;

    // Null character (0)
    case 0:
      // Push Unicode replacement character (UL+FFFD)
      outputBuffer.push(65533);
      break;

    // End-of-file or error (-1)
    case -1:
      handleClassHandle();
      insertTextAtCursor();
      resetParserState();
      break;

    // All other characters
    default:
      outputBuffer.push(charCode);
      break;
  }
}

module.exports = handleInputCharacter;