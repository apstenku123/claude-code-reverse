/**
 * Formats a JSON-like string with proper indentation and EOL sequences, optionally within a specified range.
 * Handles spaces/tabs, EOL normalization, and can keep or insert final newlines as per options.
 *
 * @param {string} sourceText - The JSON-like source text to format.
 * @param {Object} [rangeConfig] - Optional range object with 'offset' and 'length' to specify the formatting region.
 * @param {Object} formatOptions - Formatting options (insertSpaces, tabSize, keepLines, insertFinalNewline, etc).
 * @returns {Array<Object>} Array of edit objects: { offset, length, content } describing the edits to apply.
 */
function formatJsonWithIndentation(sourceText, rangeConfig, formatOptions) {
  let initialIndentLevel, detectedEol, rangeStart, rangeEnd, rangeOffset;

  // If a range is specified, determine the substring and its indentation
  if (rangeConfig) {
    rangeOffset = rangeConfig.offset;
    rangeEnd = rangeOffset + rangeConfig.length;
    rangeStart = rangeOffset;
    // Move rangeStart to the beginning of the line
    while (rangeStart > 0 && !Ni(sourceText, rangeStart - 1)) rangeStart--;
    let lineEnd = rangeEnd;
    // Move lineEnd to the end of the line
    while (lineEnd < sourceText.length && !Ni(sourceText, lineEnd)) lineEnd++;
    const selectedText = sourceText.substring(rangeStart, lineEnd);
    initialIndentLevel = countLeadingIndentationLevels(selectedText, formatOptions);
    detectedEol = detectEolSequence(formatOptions, sourceText);
  } else {
    // No range: format the whole text
    detectedEol = detectEolSequence(formatOptions, sourceText);
    initialIndentLevel = 0;
    rangeStart = 0;
    rangeOffset = 0;
    rangeEnd = sourceText.length;
  }

  // Determine EOL sequence and indentation string
  const eolSequence = detectedEol;
  const useKnownEol = PxA.includes(eolSequence);
  let lineBreakCount = 0;
  let indentLevelDelta = 0;
  let indentString;
  if (formatOptions.insertSpaces) {
    indentString = DF[formatOptions.tabSize || 4] ?? repeatString(DF[1], formatOptions.tabSize || 4);
  } else {
    indentString = "\processRuleBeginHandlers";
  }
  const indentChar = indentString === "\processRuleBeginHandlers" ? "\processRuleBeginHandlers" : " ";

  // Create a JSON scanner/tokenizer for the selected text
  const scanner = createJsonScanner(rangeConfig ? sourceText.substring(rangeStart, rangeEnd) : sourceText, false);
  let encounteredError = false;

  /**
   * Computes the indentation prefix for the current line, considering line breaks and indentation levels.
   * @returns {string}
   */
  function computeIndentPrefix() {
    if (lineBreakCount > 1) {
      // Multiple line breaks: repeat EOL and indentation
      return repeatString(eolSequence, lineBreakCount) + repeatString(indentString, initialIndentLevel + indentLevelDelta);
    }
    const indentLength = indentString.length * (initialIndentLevel + indentLevelDelta);
    if (!useKnownEol || indentLength > oO1[indentChar][eolSequence].length) {
      // Unknown EOL or indent too large: fallback
      return eolSequence + repeatString(indentString, initialIndentLevel + indentLevelDelta);
    }
    if (indentLength <= 0) return eolSequence;
    return oO1[indentChar][eolSequence][indentLength];
  }

  /**
   * Scans the next token and updates line break count and error state.
   * @returns {number} The token type.
   */
  function scanNextToken() {
    let tokenType = scanner.scan();
    lineBreakCount = 0;
    while (tokenType === 15 || tokenType === 14) { // 15: CRLF, 14: LF
      if (tokenType === 14 && formatOptions.keepLines) {
        lineBreakCount += 1;
      } else if (tokenType === 14) {
        lineBreakCount = 1;
      }
      tokenType = scanner.scan();
    }
    encounteredError = tokenType === 16 || scanner.getTokenError() !== 0;
    return tokenType;
  }

  /**
   * Stores an edit if the content between [editStart, editEnd) differs from newContent.
   * @param {string} newContent - The content to insert.
   * @param {number} editStart - Start offset in sourceText.
   * @param {number} editEnd - End offset in sourceText.
   */
  const edits = [];
  function addEdit(newContent, editStart, editEnd) {
    if (!encounteredError && (!rangeConfig || (editStart < rangeEnd && editEnd > rangeOffset)) && sourceText.substring(editStart, editEnd) !== newContent) {
      edits.push({
        offset: editStart,
        length: editEnd - editStart,
        content: newContent
      });
    }
  }

  // Begin scanning and formatting
  let tokenType = scanNextToken();
  if (formatOptions.keepLines && lineBreakCount > 0) {
    addEdit(repeatString(eolSequence, lineBreakCount), 0, 0);
  }
  if (tokenType !== 17) { // 17: EOF
    const tokenOffset = scanner.getTokenOffset() + rangeStart;
    const indentPrefix = indentString.length * initialIndentLevel < 20 && formatOptions.insertSpaces
      ? DF[indentString.length * initialIndentLevel]
      : repeatString(indentString, initialIndentLevel);
    addEdit(indentPrefix, rangeStart, tokenOffset);
  }

  while (tokenType !== 17) { // While not EOF
    let tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + rangeStart;
    let nextTokenType = scanNextToken();
    let insertContent = "";
    let justAddedLineBreak = false;
    // Handle line breaks and whitespace tokens
    while (lineBreakCount === 0 && (nextTokenType === 12 || nextTokenType === 13)) { // 12: whitespace, 13: comment?
      const whitespaceStart = scanner.getTokenOffset() + rangeStart;
      addEdit(DF[1], tokenEnd, whitespaceStart);
      tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + rangeStart;
      justAddedLineBreak = nextTokenType === 12;
      insertContent = justAddedLineBreak ? computeIndentPrefix() : "";
      nextTokenType = scanNextToken();
    }
    // Handle indentation changes and line breaks
    if (nextTokenType === 2) { // 2: closing brace
      if (tokenType !== 1) indentLevelDelta--;
      if ((formatOptions.keepLines && lineBreakCount > 0) || (!formatOptions.keepLines && tokenType !== 1)) {
        insertContent = computeIndentPrefix();
      } else if (formatOptions.keepLines) {
        insertContent = DF[1];
      }
    } else if (nextTokenType === 4) { // 4: closing bracket
      if (tokenType !== 3) indentLevelDelta--;
      if ((formatOptions.keepLines && lineBreakCount > 0) || (!formatOptions.keepLines && tokenType !== 3)) {
        insertContent = computeIndentPrefix();
      } else if (formatOptions.keepLines) {
        insertContent = DF[1];
      }
    } else {
      switch (tokenType) {
        case 3: // open bracket
        case 1: // open brace
          indentLevelDelta++;
          if ((formatOptions.keepLines && lineBreakCount > 0) || !formatOptions.keepLines) {
            insertContent = computeIndentPrefix();
          } else {
            insertContent = DF[1];
          }
          break;
        case 5: // colon
          if ((formatOptions.keepLines && lineBreakCount > 0) || !formatOptions.keepLines) {
            insertContent = computeIndentPrefix();
          } else {
            insertContent = DF[1];
          }
          break;
        case 12: // whitespace
          insertContent = computeIndentPrefix();
          break;
        case 13: // comment?
          if (lineBreakCount > 0) {
            insertContent = computeIndentPrefix();
          } else if (!justAddedLineBreak) {
            insertContent = DF[1];
          }
          break;
        case 6: // comma
          if (formatOptions.keepLines && lineBreakCount > 0) {
            insertContent = computeIndentPrefix();
          } else if (!justAddedLineBreak) {
            insertContent = DF[1];
          }
          break;
        case 10: // unknown
          if (formatOptions.keepLines && lineBreakCount > 0) {
            insertContent = computeIndentPrefix();
          } else if (nextTokenType === 6 && !justAddedLineBreak) {
            insertContent = "";
          }
          break;
        case 7:
        case 8:
        case 9:
        case 11:
        case 2:
        case 4:
          if (formatOptions.keepLines && lineBreakCount > 0) {
            insertContent = computeIndentPrefix();
          } else if ((nextTokenType === 12 || nextTokenType === 13) && !justAddedLineBreak) {
            insertContent = DF[1];
          } else if (nextTokenType !== 5 && nextTokenType !== 17) {
            encounteredError = true;
          }
          break;
        case 16:
          encounteredError = true;
          break;
      }
      if (lineBreakCount > 0 && (nextTokenType === 12 || nextTokenType === 13)) {
        insertContent = computeIndentPrefix();
      }
    }
    // Handle final newline
    if (nextTokenType === 17) {
      if (formatOptions.keepLines && lineBreakCount > 0) {
        insertContent = computeIndentPrefix();
      } else {
        insertContent = formatOptions.insertFinalNewline ? eolSequence : "";
      }
    }
    const editStart = scanner.getTokenOffset() + rangeStart;
    addEdit(insertContent, tokenEnd, editStart);
    tokenType = nextTokenType;
  }
  return edits;
}

module.exports = formatJsonWithIndentation;