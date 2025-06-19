/**
 * Formats a JSON-like string, computing and returning the minimal set of whitespace edits required
 * to match a desired formatting configuration. This is used for pretty-printing, whitespace normalization,
 * and ensuring consistent indentation and line endings.
 *
 * @param {string} inputText - The source JSON-like string to format.
 * @param {Object} [range] - Optional. Specifies a range within the string to format. Should have 'offset' and 'length' properties.
 * @param {Object} options - Formatting options, including tab size, whether to insert spaces, EOL preferences, etc.
 * @returns {Array<Object>} Array of edit objects, each with 'offset', 'length', and 'content' properties, describing the whitespace edits to apply.
 */
function formatJsonWithWhitespaceEdits(inputText, range, options) {
  let indentLevel, detectedEol, rangeStart, rangeEnd, rangeOffset;

  // Determine the range to format
  if (range) {
    rangeOffset = range.offset;
    rangeEnd = rangeOffset + range.length;
    rangeStart = rangeOffset;
    // Expand range to nearest line boundaries
    while (rangeStart > 0 && !isCharCarriageReturnOrLineFeed(inputText, rangeStart - 1)) rangeStart--;
    let tempEnd = rangeEnd;
    while (tempEnd < inputText.length && !isCharCarriageReturnOrLineFeed(inputText, tempEnd)) tempEnd++;
    const textToFormat = inputText.substring(rangeStart, tempEnd);
    indentLevel = countLeadingIndentationLevels(textToFormat, options); // Not yet refactored
    detectedEol = textToFormat;
  } else {
    detectedEol = inputText;
    indentLevel = 0;
    rangeStart = 0;
    rangeOffset = 0;
    rangeEnd = inputText.length;
  }

  // Detect EOL sequence
  const eol = detectEndOfLineSequence(options, inputText);
  const isKnownEol = PxA.includes(eol);
  let lineBreakCount = 0;
  let indentAdjustment = 0;
  let indentString;

  // Determine indentation string (spaces or tabs)
  if (options.insertSpaces) {
    indentString = DF[options.tabSize || 4] ?? repeatString(DF[1], options.tabSize || 4); // repeatString not yet refactored
  } else {
    indentString = "\processRuleBeginHandlers";
  }

  const indentChar = indentString === "\processRuleBeginHandlers" ? "\processRuleBeginHandlers" : " ";
  const scanner = createJsonScanner(detectedEol, false);
  let encounteredError = false;

  /**
   * Computes the whitespace string for the current line, considering indentation and line breaks.
   * @returns {string}
   */
  function computeWhitespace() {
    if (lineBreakCount > 1) {
      return repeatString(eol, lineBreakCount) + repeatString(indentString, indentLevel + indentAdjustment);
    }
    const totalIndentLength = indentString.length * (indentLevel + indentAdjustment);
    if (!isKnownEol || totalIndentLength > oO1[indentChar][eol].length) {
      return eol + repeatString(indentString, indentLevel + indentAdjustment);
    }
    if (totalIndentLength <= 0) {
      return eol;
    }
    return oO1[indentChar][eol][totalIndentLength];
  }

  /**
   * Scans the next token and updates line break count and error state.
   * @returns {number} The token type.
   */
  function scanNextToken() {
    let tokenType = scanner.scan();
    lineBreakCount = 0;
    while (tokenType === 15 || tokenType === 14) { // 15: line break, 14: carriage return
      if (tokenType === 14 && options.keepLines) {
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
   * Adds an edit if the content between start and end does not match the desired whitespace.
   * @param {string} desiredWhitespace - The whitespace string to insert.
   * @param {number} startOffset - Start offset in the input text.
   * @param {number} endOffset - End offset in the input text.
   */
  function addEdit(desiredWhitespace, startOffset, endOffset) {
    if (!encounteredError && (!range || (startOffset < rangeEnd && endOffset > rangeOffset)) && inputText.substring(startOffset, endOffset) !== desiredWhitespace) {
      edits.push({
        offset: startOffset,
        length: endOffset - startOffset,
        content: desiredWhitespace
      });
    }
  }

  let tokenType = scanNextToken();
  if (options.keepLines && lineBreakCount > 0) {
    addEdit(repeatString(eol, lineBreakCount), 0, 0);
  }
  if (tokenType !== 17) { // 17: EOF
    const tokenOffset = scanner.getTokenOffset() + rangeStart;
    const indentPrefix = indentString.length * indentLevel < 20 && options.insertSpaces ? DF[indentString.length * indentLevel] : repeatString(indentString, indentLevel);
    addEdit(indentPrefix, rangeStart, tokenOffset);
  }

  while (tokenType !== 17) { // While not EOF
    let tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + rangeStart;
    let nextTokenType = scanNextToken();
    let whitespaceToInsert = "";
    let justInsertedLineBreak = false;

    // Handle line breaks and whitespace between tokens
    while (lineBreakCount === 0 && (nextTokenType === 12 || nextTokenType === 13)) { // 12: whitespace, 13: comment?
      const whitespaceStart = scanner.getTokenOffset() + rangeStart;
      addEdit(DF[1], tokenEnd, whitespaceStart);
      tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + rangeStart;
      justInsertedLineBreak = nextTokenType === 12;
      whitespaceToInsert = justInsertedLineBreak ? computeWhitespace() : "";
      nextTokenType = scanNextToken();
    }

    // Handle indentation adjustment for brackets/braces
    if (nextTokenType === 2) { // 2: closing brace
      if (tokenType !== 1) indentAdjustment--;
      if ((options.keepLines && lineBreakCount > 0) || (!options.keepLines && tokenType !== 1)) {
        whitespaceToInsert = computeWhitespace();
      } else if (options.keepLines) {
        whitespaceToInsert = DF[1];
      }
    } else if (nextTokenType === 4) { // 4: closing bracket
      if (tokenType !== 3) indentAdjustment--;
      if ((options.keepLines && lineBreakCount > 0) || (!options.keepLines && tokenType !== 3)) {
        whitespaceToInsert = computeWhitespace();
      } else if (options.keepLines) {
        whitespaceToInsert = DF[1];
      }
    } else {
      switch (tokenType) {
        case 3: // open bracket
        case 1: // open brace
          indentAdjustment++;
          if ((options.keepLines && lineBreakCount > 0) || !options.keepLines) {
            whitespaceToInsert = computeWhitespace();
          } else {
            whitespaceToInsert = DF[1];
          }
          break;
        case 5: // colon
          if ((options.keepLines && lineBreakCount > 0) || !options.keepLines) {
            whitespaceToInsert = computeWhitespace();
          } else {
            whitespaceToInsert = DF[1];
          }
          break;
        case 12: // whitespace
          whitespaceToInsert = computeWhitespace();
          break;
        case 13: // comment
          if (lineBreakCount > 0) {
            whitespaceToInsert = computeWhitespace();
          } else if (!justInsertedLineBreak) {
            whitespaceToInsert = DF[1];
          }
          break;
        case 6: // comma
          if (options.keepLines && lineBreakCount > 0) {
            whitespaceToInsert = computeWhitespace();
          } else if (!justInsertedLineBreak) {
            whitespaceToInsert = DF[1];
          }
          break;
        case 10: // unknown
          if (options.keepLines && lineBreakCount > 0) {
            whitespaceToInsert = computeWhitespace();
          } else if (nextTokenType === 6 && !justInsertedLineBreak) {
            whitespaceToInsert = "";
          }
          break;
        case 7:
        case 8:
        case 9:
        case 11:
        case 2:
        case 4:
          if (options.keepLines && lineBreakCount > 0) {
            whitespaceToInsert = computeWhitespace();
          } else if ((nextTokenType === 12 || nextTokenType === 13) && !justInsertedLineBreak) {
            whitespaceToInsert = DF[1];
          } else if (nextTokenType !== 5 && nextTokenType !== 17) {
            encounteredError = true;
          }
          break;
        case 16:
          encounteredError = true;
          break;
      }
      if (lineBreakCount > 0 && (nextTokenType === 12 || nextTokenType === 13)) {
        whitespaceToInsert = computeWhitespace();
      }
    }

    // Handle end of file
    if (nextTokenType === 17) {
      if (options.keepLines && lineBreakCount > 0) {
        whitespaceToInsert = computeWhitespace();
      } else {
        whitespaceToInsert = options.insertFinalNewline ? eol : "";
      }
    }

    const whitespaceEnd = scanner.getTokenOffset() + rangeStart;
    addEdit(whitespaceToInsert, tokenEnd, whitespaceEnd);
    tokenType = nextTokenType;
  }

  return edits;
}

module.exports = formatJsonWithWhitespaceEdits;