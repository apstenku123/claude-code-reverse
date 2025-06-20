/**
 * Processes a character code as part of HTML tag parsing, updating tag name and state as needed.
 *
 * @param {number} charCode - The character code to process (e.g., from input stream).
 * @returns {void}
 *
 * This function updates the current tag name, parser state, and buffers based on the character code provided.
 * It handles whitespace, tag delimiters, and alphabetical characters for tag names.
 */
function handleHtmlTagCharacterCode(charCode) {
  switch (charCode) {
    // Whitespace characters: Tab, Line Feed, Form Feed, Space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      if (isAllowedJsonCharacterCode(currentTagName)) {
        parserState = STATE_BEFORE_ATTRIBUTE_NAME;
        return;
      }
      break;
    // Slash '/': Possible self-closing tag
    case 47:
      if (isAllowedJsonCharacterCode(currentTagName)) {
        parserState = STATE_SELF_CLOSING_START_TAG;
        return;
      }
      break;
    // Greater-than '>': End of tag
    case 62:
      if (isAllowedJsonCharacterCode(currentTagName)) {
        parserState = STATE_DATA;
        handleTagClose();
        return;
      }
      break;
    // Uppercase a-zA: Convert to lowercase and add to tag name
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
      // Convert uppercase to lowercase by adding 32
      currentTagName += String.fromCharCode(charCode + 32);
      tagNameCharCodes.push(charCode);
      return;
    // Lowercase a-z: Add directly to tag name
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
      currentTagName += String.fromCharCode(charCode);
      tagNameCharCodes.push(charCode);
      return;
    default:
      break;
  }
  // For any other character, treat as parse error and flush buffers
  tagBuffer.push(60); // '<'
  tagBuffer.push(47); // '/'
  appendCharCodesToBuffer(tagBuffer, tagNameCharCodes);
  handleParseError(charCode, ERROR_CODE_INVALID_TAG_CHARACTER);
}

module.exports = handleHtmlTagCharacterCode;