/**
 * Computes the necessary text edits to adjust indentation and line endings in a given text segment.
 *
 * This function analyzes a segment of text (optionally a selection), determines the required indentation and line ending adjustments
 * according to the provided formatting options, and returns a list of edit operations to transform the text accordingly.
 *
 * @param {string} text - The full text to process.
 * @param {Object} selection - Optional selection object with 'offset' and 'length' properties. If provided, only this segment is processed.
 * @param {Object} options - Formatting options, including:
 *   - insertSpaces: Whether to use spaces for indentation.
 *   - tabSize: Number of spaces per tab.
 *   - keepLines: Whether to preserve line breaks.
 *   - insertFinalNewline: Whether to ensure a final newline at the end.
 * @returns {Array<Object>} List of edit operations, each with { offset, length, content }.
 */
function computeTextEditsForIndentation(text, selection, options) {
  let leadingIndentLevel, detectedEOL, selectionStart, selectionEnd, selectionOffset;

  // If a selection is provided, extract its bounds and determine the starting indentation
  if (selection) {
    selectionOffset = selection.offset;
    selectionEnd = selectionOffset + selection.length;
    selectionStart = selectionOffset;
    // Move selectionStart backwards to the start of the line
    while (selectionStart > 0 && !isCharCarriageReturnOrLineFeed(text, selectionStart - 1)) selectionStart--;
    let tempEnd = selectionEnd;
    // Move tempEnd forward to the end of the line
    while (tempEnd < text.length && !isCharCarriageReturnOrLineFeed(text, tempEnd)) tempEnd++;
    const selectedText = text.substring(selectionStart, tempEnd);
    leadingIndentLevel = countLeadingIndentationLevels(selectedText, options);
  } else {
    // No selection: process the whole text
    selectionStart = 0;
    selectionOffset = 0;
    selectionEnd = text.length;
    leadingIndentLevel = 0;
  }

  detectedEOL = detectEndOfLineSequence(options, text);
  const isKnownEOL = PxA.includes(detectedEOL);
  let lineBreakCount = 0;
  let indentAdjustment = 0;
  let editContent;

  // Determine the indentation string to use
  let indentString;
  if (options.insertSpaces) {
    indentString = DF[options.tabSize || 4] ?? repeatString(DF[1], options.tabSize || 4);
  } else {
    indentString = "\processRuleBeginHandlers";
  }
  // Used for oO1 lookup: either tab or space
  const indentChar = indentString === "\processRuleBeginHandlers" ? "\processRuleBeginHandlers" : " ";

  // Create a scanner for the selected text
  const scanner = createJsonScanner(selection ? text.substring(selectionStart, selectionEnd) : text, false);
  let encounteredError = false;

  /**
   * Helper to compute the correct indentation for the current line.
   * Returns the EOL + indentation string for the current context.
   */
  function computeLineIndentation() {
    if (lineBreakCount > 1) {
      return repeatString(detectedEOL, lineBreakCount) + repeatString(indentString, leadingIndentLevel + indentAdjustment);
    }
    const totalIndentLength = indentString.length * (leadingIndentLevel + indentAdjustment);
    if (!isKnownEOL || totalIndentLength > oO1[indentChar][detectedEOL].length) {
      return detectedEOL + repeatString(indentString, leadingIndentLevel + indentAdjustment);
    }
    if (totalIndentLength <= 0) return detectedEOL;
    return oO1[indentChar][detectedEOL][totalIndentLength];
  }

  /**
   * Scans the next token and updates lineBreakCount and encounteredError accordingly.
   * Returns the token type.
   */
  function scanNextToken() {
    let tokenType = scanner.scan();
    lineBreakCount = 0;
    while (tokenType === 15 || tokenType === 14) { // 15: CRLF, 14: LF/CR
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

  // List of edit operations to apply
  const edits = [];

  /**
   * Adds an edit operation if the content differs from the original text in the given range.
   * @param {string} newContent - The content to insert.
   * @param {number} rangeStart - Start offset in the original text.
   * @param {number} rangeEnd - End offset in the original text.
   */
  function addEditIfChanged(newContent, rangeStart, rangeEnd) {
    if (!encounteredError && (!selection || (rangeStart < selectionEnd && rangeEnd > selectionOffset)) && text.substring(rangeStart, rangeEnd) !== newContent) {
      edits.push({
        offset: rangeStart,
        length: rangeEnd - rangeStart,
        content: newContent
      });
    }
  }

  let tokenType = scanNextToken();
  // If handleMissingDoctypeError need to preserve lines and there are line breaks, insert them at the start
  if (options.keepLines && lineBreakCount > 0) {
    addEditIfChanged(repeatString(detectedEOL, lineBreakCount), 0, 0);
  }
  if (tokenType !== 17) { // 17: EOF
    const tokenStart = scanner.getTokenOffset() + selectionStart;
    // Use cached indent string if possible, otherwise repeat
    const indentPrefix = indentString.length * leadingIndentLevel < 20 && options.insertSpaces ? DF[indentString.length * leadingIndentLevel] : repeatString(indentString, leadingIndentLevel);
    addEditIfChanged(indentPrefix, selectionStart, tokenStart);
  }

  // Main loop: process tokens and compute necessary edits
  while (tokenType !== 17) { // 17: EOF
    let tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + selectionStart;
    let nextTokenType = scanNextToken();
    let editString = "";
    let justInsertedLineBreak = false;

    // Handle consecutive line breaks
    while (lineBreakCount === 0 && (nextTokenType === 12 || nextTokenType === 13)) { // 12: whitespace, 13: comment?
      const whitespaceStart = scanner.getTokenOffset() + selectionStart;
      addEditIfChanged(DF[1], tokenEnd, whitespaceStart);
      tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + selectionStart;
      justInsertedLineBreak = nextTokenType === 12;
      editString = justInsertedLineBreak ? computeLineIndentation() : "";
      nextTokenType = scanNextToken();
    }

    // Handle indentation adjustment for various token types
    if (nextTokenType === 2) { // 2: closing brace
      if (tokenType !== 1) indentAdjustment--;
      if (options.keepLines && lineBreakCount > 0 || !options.keepLines && tokenType !== 1) {
        editString = computeLineIndentation();
      } else if (options.keepLines) {
        editString = DF[1];
      }
    } else if (nextTokenType === 4) { // 4: closing bracket
      if (tokenType !== 3) indentAdjustment--;
      if (options.keepLines && lineBreakCount > 0 || !options.keepLines && tokenType !== 3) {
        editString = computeLineIndentation();
      } else if (options.keepLines) {
        editString = DF[1];
      }
    } else {
      switch (tokenType) {
        case 3: // open bracket
        case 1: // open brace
          indentAdjustment++;
          if (options.keepLines && lineBreakCount > 0 || !options.keepLines) {
            editString = computeLineIndentation();
          } else {
            editString = DF[1];
          }
          break;
        case 5: // colon
          if (options.keepLines && lineBreakCount > 0 || !options.keepLines) {
            editString = computeLineIndentation();
          } else {
            editString = DF[1];
          }
          break;
        case 12: // whitespace
          editString = computeLineIndentation();
          break;
        case 13: // comment?
          if (lineBreakCount > 0) {
            editString = computeLineIndentation();
          } else if (!justInsertedLineBreak) {
            editString = DF[1];
          }
          break;
        case 6: // comma
          if (options.keepLines && lineBreakCount > 0) {
            editString = computeLineIndentation();
          } else if (!justInsertedLineBreak) {
            editString = DF[1];
          }
          break;
        case 10: // unknown
          if (options.keepLines && lineBreakCount > 0) {
            editString = computeLineIndentation();
          } else if (nextTokenType === 6 && !justInsertedLineBreak) {
            editString = "";
          }
          break;
        case 7:
        case 8:
        case 9:
        case 11:
        case 2:
        case 4:
          if (options.keepLines && lineBreakCount > 0) {
            editString = computeLineIndentation();
          } else if ((nextTokenType === 12 || nextTokenType === 13) && !justInsertedLineBreak) {
            editString = DF[1];
          } else if (nextTokenType !== 5 && nextTokenType !== 17) {
            encounteredError = true;
          }
          break;
        case 16: // error
          encounteredError = true;
          break;
      }
      if (lineBreakCount > 0 && (nextTokenType === 12 || nextTokenType === 13)) {
        editString = computeLineIndentation();
      }
    }

    // Handle end of file
    if (nextTokenType === 17) {
      if (options.keepLines && lineBreakCount > 0) {
        editString = computeLineIndentation();
      } else {
        editString = options.insertFinalNewline ? detectedEOL : "";
      }
    }

    const editStart = scanner.getTokenOffset() + selectionStart;
    addEditIfChanged(editString, tokenEnd, editStart);
    tokenType = nextTokenType;
  }

  return edits;
}

module.exports = computeTextEditsForIndentation;