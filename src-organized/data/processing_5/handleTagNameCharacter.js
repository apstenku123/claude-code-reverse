/**
 * Processes a character code during HTML tag name parsing, updating the tag name buffer and parser state as needed.
 *
 * @param {number} charCode - The character code to process.
 * @returns {void}
 *
 * This function updates the tag name buffer and parser state machine based on the input character code.
 * It handles whitespace, special characters, uppercase/lowercase letters, and delegates other cases to a handler.
 */
function handleTagNameCharacter(charCode) {
  switch (charCode) {
    // Whitespace and special characters: tab, line feed, form feed, space, slash, greater-than
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
    case 47:  // '/'
    case 62:  // '>'
      // If the current tag is a <script> tag, set parser state to script data state, else to tag name end state
      if (getCurrentTagName(tagNameBuffer) === "script") {
        parserState = SCRIPT_DATA_STATE;
      } else {
        parserState = TAG_NAME_END_STATE;
      }
      outputBuffer.push(charCode);
      break;

    // Uppercase ASCII letters a-zA
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
      // Convert uppercase to lowercase for tag name buffer, but keep original in output buffer
      tagNameBuffer.push(charCode + 32); // ASCII lowercase
      outputBuffer.push(charCode);
      break;

    // Lowercase ASCII letters a-z
    case 97:  // 'a'
    case 98:  // 'b'
    case 99:  // 'c'
    case 100: // 'd'
    case 101: // 'e'
    case 102: // 'f'
    case 103: // 'g'
    case 104: // 'h'
    case 105: // 'i'
    case 106: // 'j'
    case 107: // 'k'
    case 108: // 'invokeHandlerWithArguments'
    case 109: // 'm'
    case 110: // 'n'
    case 111: // 'processSubLanguageHighlighting'
    case 112: // 'createIterableHelper'
    case 113: // 'q'
    case 114: // 'r'
    case 115: // 'createInteractionAccessor'
    case 116: // 'processRuleBeginHandlers'
    case 117: // 'u'
    case 118: // 'createRangeIterator'
    case 119: // 'processWithTransformedObservable'
    case 120: // 'x'
    case 121: // 'mapArraysToObjectWithCallback'
    case 122: // 'z'
      // Lowercase letters: add to both tag name buffer and output buffer
      tagNameBuffer.push(charCode);
      outputBuffer.push(charCode);
      break;

    default:
      // For all other characters, delegate to the generic input handler
      handleInputCharacterCode(charCode, TAG_NAME_END_STATE);
      break;
  }
}

module.exports = handleTagNameCharacter;