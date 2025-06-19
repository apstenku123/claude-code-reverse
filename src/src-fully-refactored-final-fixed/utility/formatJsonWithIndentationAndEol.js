/**
 * Formats a JSON string with proper indentation and end-of-line (EOL) sequences, optionally within a specified range.
 * Handles whitespace, line endings, and indentation according to the provided formatting options.
 *
 * @param {string} jsonText - The JSON string to format.
 * @param {Object} [range] - Optional. Specifies the range within the string to format. Should have 'offset' and 'length' properties.
 * @param {Object} formatOptions - Formatting options including tabSize, insertSpaces, keepLines, and insertFinalNewline.
 * @returns {Array<{offset: number, length: number, content: string}>} - List of edits to apply to the original string for formatting.
 */
function formatJsonWithIndentationAndEol(jsonText, range, formatOptions) {
  let initialIndentLevel, detectedEol, rangeStart, rangeEnd, rangeOffset;

  // If a range is provided, determine the substring and its indentation
  if (range) {
    rangeOffset = range.offset;
    rangeEnd = rangeOffset + range.length;
    rangeStart = rangeOffset;
    // Move rangeStart back to the beginning of the line
    while (rangeStart > 0 && !isCarriageReturnOrLineFeedAtIndex(jsonText, rangeStart - 1)) {
      rangeStart--;
    }
    let localRangeEnd = rangeEnd;
    // Move localRangeEnd forward to the end of the line
    while (localRangeEnd < jsonText.length && !isCarriageReturnOrLineFeedAtIndex(jsonText, localRangeEnd)) {
      localRangeEnd++;
    }
    const rangeText = jsonText.substring(rangeStart, localRangeEnd);
    initialIndentLevel = countLeadingIndentationLevels(rangeText, formatOptions); // Not yet refactored
    detectedEol = detectEolSequence(formatOptions, jsonText);
  } else {
    // No range: format the whole string
    detectedEol = detectEolSequence(formatOptions, jsonText);
    initialIndentLevel = 0;
    rangeStart = 0;
    rangeOffset = 0;
    rangeEnd = jsonText.length;
  }

  const eol = detectedEol;
  const isEolKnown = PxA.includes(eol);
  let lineBreakCount = 0;
  let indentLevelDelta = 0;
  let indentString;

  // Determine the indentation string (tabs or spaces)
  if (formatOptions.insertSpaces) {
    indentString = DF[formatOptions.tabSize || 4] ?? repeatString(DF[1], formatOptions.tabSize || 4); // Not yet refactored
  } else {
    indentString = "\processRuleBeginHandlers";
  }
  const indentChar = indentString === "\processRuleBeginHandlers" ? "\processRuleBeginHandlers" : " ";

  // Create a JSON scanner for the relevant substring
  const scanner = createJsonScanner(range ? jsonText.substring(rangeStart, rangeEnd) : jsonText, false);
  let encounteredError = false;

  /**
   * Returns the correct indentation and EOL string for the current line.
   */
  function getIndentAndEol() {
    if (lineBreakCount > 1) {
      // Multiple line breaks: repeat EOL and indentation
      return repeatString(eol, lineBreakCount) + repeatString(indentString, initialIndentLevel + indentLevelDelta);
    }
    const totalIndentLength = indentString.length * (initialIndentLevel + indentLevelDelta);
    if (!isEolKnown || totalIndentLength > oO1[indentChar][eol].length) {
      // Unknown EOL or indentation too large: build manually
      return eol + repeatString(indentString, initialIndentLevel + indentLevelDelta);
    }
    if (totalIndentLength <= 0) {
      return eol;
    }
    // Use cached EOL+indent string
    return oO1[indentChar][eol][totalIndentLength];
  }

  /**
   * Scans the next token and updates lineBreakCount and encounteredError.
   * @returns {number} The token type.
   */
  function scanNextToken() {
    let tokenType = scanner.scan();
    lineBreakCount = 0;
    while (tokenType === 15 || tokenType === 14) { // 15: LineBreakTrivia, 14: LineBreak
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

  const edits = [];
  /**
   * Adds an edit if the substring between startOffset and endOffset does not match the desired content.
   * @param {string} newContent - The content to insert.
   * @param {number} startOffset - Start offset in the original string.
   * @param {number} endOffset - End offset in the original string.
   */
  function addEdit(newContent, startOffset, endOffset) {
    if (!encounteredError && (!range || (startOffset < rangeEnd && endOffset > rangeOffset)) && jsonText.substring(startOffset, endOffset) !== newContent) {
      edits.push({
        offset: startOffset,
        length: endOffset - startOffset,
        content: newContent
      });
    }
  }

  let tokenType = scanNextToken();
  // If keepLines is enabled and there were line breaks at the start, add them
  if (formatOptions.keepLines && lineBreakCount > 0) {
    addEdit(repeatString(eol, lineBreakCount), 0, 0);
  }

  // Handle the first token (usually whitespace/indentation)
  if (tokenType !== 17) { // 17: EOF
    const tokenOffset = scanner.getTokenOffset() + rangeStart;
    const indent = indentString.length * initialIndentLevel < 20 && formatOptions.insertSpaces ? DF[indentString.length * initialIndentLevel] : repeatString(indentString, initialIndentLevel);
    addEdit(indent, rangeStart, tokenOffset);
  }

  // Main formatting loop
  while (tokenType !== 17) { // 17: EOF
    let tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + rangeStart;
    let nextTokenType = scanNextToken();
    let newContent = "";
    let justAddedLineBreak = false;

    // Handle whitespace and line breaks between tokens
    while (lineBreakCount === 0 && (nextTokenType === 12 || nextTokenType === 13)) { // 12: Trivia, 13: Whitespace
      const triviaStart = scanner.getTokenOffset() + rangeStart;
      addEdit(DF[1], tokenEnd, triviaStart);
      tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + rangeStart;
      justAddedLineBreak = nextTokenType === 12;
      newContent = justAddedLineBreak ? getIndentAndEol() : "";
      nextTokenType = scanNextToken();
    }

    // Handle indentation and EOL based on token types
    if (nextTokenType === 2) { // 2: CloseBraceToken
      if (tokenType !== 1) indentLevelDelta--;
      if ((formatOptions.keepLines && lineBreakCount > 0) || (!formatOptions.keepLines && tokenType !== 1)) {
        newContent = getIndentAndEol();
      } else if (formatOptions.keepLines) {
        newContent = DF[1];
      }
    } else if (nextTokenType === 4) { // 4: CloseBracketToken
      if (tokenType !== 3) indentLevelDelta--;
      if ((formatOptions.keepLines && lineBreakCount > 0) || (!formatOptions.keepLines && tokenType !== 3)) {
        newContent = getIndentAndEol();
      } else if (formatOptions.keepLines) {
        newContent = DF[1];
      }
    } else {
      // Switch on previous token type
      switch (tokenType) {
        case 3: // OpenBracketToken
        case 1: // OpenBraceToken
          indentLevelDelta++;
          if ((formatOptions.keepLines && lineBreakCount > 0) || !formatOptions.keepLines) {
            newContent = getIndentAndEol();
          } else {
            newContent = DF[1];
          }
          break;
        case 5: // ColonToken
          if ((formatOptions.keepLines && lineBreakCount > 0) || !formatOptions.keepLines) {
            newContent = getIndentAndEol();
          } else {
            newContent = DF[1];
          }
          break;
        case 12: // Trivia
          newContent = getIndentAndEol();
          break;
        case 13: // Whitespace
          if (lineBreakCount > 0) {
            newContent = getIndentAndEol();
          } else if (!justAddedLineBreak) {
            newContent = DF[1];
          }
          break;
        case 6: // CommaToken
          if (formatOptions.keepLines && lineBreakCount > 0) {
            newContent = getIndentAndEol();
          } else if (!justAddedLineBreak) {
            newContent = DF[1];
          }
          break;
        case 10: // StringLiteral
          if (formatOptions.keepLines && lineBreakCount > 0) {
            newContent = getIndentAndEol();
          } else if (nextTokenType === 6 && !justAddedLineBreak) {
            newContent = "";
          }
          break;
        case 7: // NumberLiteral
        case 8: // TrueKeyword
        case 9: // FalseKeyword
        case 11: // NullKeyword
        case 2: // CloseBraceToken
        case 4: // CloseBracketToken
          if (formatOptions.keepLines && lineBreakCount > 0) {
            newContent = getIndentAndEol();
          } else if ((nextTokenType === 12 || nextTokenType === 13) && !justAddedLineBreak) {
            newContent = DF[1];
          } else if (nextTokenType !== 5 && nextTokenType !== 17) {
            encounteredError = true;
          }
          break;
        case 16: // ErrorToken
          encounteredError = true;
          break;
      }
      if (lineBreakCount > 0 && (nextTokenType === 12 || nextTokenType === 13)) {
        newContent = getIndentAndEol();
      }
    }

    // Handle final newline at EOF
    if (nextTokenType === 17) { // 17: EOF
      if (formatOptions.keepLines && lineBreakCount > 0) {
        newContent = getIndentAndEol();
      } else {
        newContent = formatOptions.insertFinalNewline ? eol : "";
      }
    }

    const nextTokenOffset = scanner.getTokenOffset() + rangeStart;
    addEdit(newContent, tokenEnd, nextTokenOffset);
    tokenType = nextTokenType;
  }

  return edits;
}

module.exports = formatJsonWithIndentationAndEol;