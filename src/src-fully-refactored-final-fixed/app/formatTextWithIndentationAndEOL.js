/**
 * Formats a section of text with proper indentation and end-of-line (EOL) sequences according to the provided options.
 * Handles indentation, EOL normalization, and whitespace preservation for code formatting scenarios.
 *
 * @param {string} text - The full text to process.
 * @param {Object} selection - Optional selection object with 'offset' and 'length' properties, specifying the range to format.
 * @param {Object} options - Formatting options (e.g., tabSize, insertSpaces, keepLines, insertFinalNewline).
 * @returns {Array<{offset: number, length: number, content: string}>} - Array of edits specifying where and what to replace in the text.
 */
function M(text, selection, options) {
  let indentationLevel, eolSequence, selectionStart, selectionEnd, selectionOffset;

  // If a selection is provided, determine its bounds and leading indentation
  if (selection) {
    selectionOffset = selection.offset;
    selectionEnd = selectionOffset + selection.length;
    selectionStart = selectionOffset;
    // Move selectionStart backwards to the start of the line
    while (selectionStart > 0 && !Ni(text, selectionStart - 1)) selectionStart--;
    let tempEnd = selectionEnd;
    // Move tempEnd forward to the end of the line
    while (tempEnd < text.length && !Ni(text, tempEnd)) tempEnd++;
    const selectedText = text.substring(selectionStart, tempEnd);
    indentationLevel = countLeadingIndentationLevels(selectedText, options);
    eolSequence = detectEolSequence(options, text);
  } else {
    // No selection: process the entire text
    eolSequence = detectEolSequence(options, text);
    indentationLevel = 0;
    selectionStart = 0;
    selectionOffset = 0;
    selectionEnd = text.length;
  }

  // Determine if the detected EOL is one of the preferred EOLs
  const isPreferredEOL = PxA.includes(eolSequence);
  let lineCount = 0;
  let indentAdjustment = 0;
  let indentString;

  // Determine the indentation string (tabs or spaces)
  if (options.insertSpaces) {
    indentString = DF[options.tabSize || 4] ?? repeatString(DF[1], options.tabSize || 4);
  } else {
    indentString = "\processRuleBeginHandlers";
  }

  // Used for EOL mapping in oO1
  const eolType = indentString === "\processRuleBeginHandlers" ? "\processRuleBeginHandlers" : " ";

  // Create a JSON scanner/tokenizer for the selected text
  const scanner = createJsonScanner(selection ? text.substring(selectionStart, selectionEnd) : text, false);
  let encounteredError = false;

  /**
   * Computes the indentation and EOL string for the current line.
   * @returns {string}
   */
  function computeLinePrefix() {
    if (lineCount > 1) return repeatString(eolSequence, lineCount) + repeatString(indentString, indentationLevel + indentAdjustment);
    const totalIndentLength = indentString.length * (indentationLevel + indentAdjustment);
    if (!isPreferredEOL || totalIndentLength > oO1[eolType][eolSequence].length) {
      return eolSequence + repeatString(indentString, indentationLevel + indentAdjustment);
    }
    if (totalIndentLength <= 0) return eolSequence;
    return oO1[eolType][eolSequence][totalIndentLength];
  }

  /**
   * Scans the next token and updates lineCount and encounteredError.
   * @returns {number} The token type.
   */
  function scanNextToken() {
    let tokenType = scanner.scan();
    lineCount = 0;
    while (tokenType === 15 || tokenType === 14) { // 15: whitespace, 14: line break
      if (tokenType === 14 && options.keepLines) lineCount += 1;
      else if (tokenType === 14) lineCount = 1;
      tokenType = scanner.scan();
    }
    encounteredError = tokenType === 16 || scanner.getTokenError() !== 0;
    return tokenType;
  }

  // List of edits to apply to the text
  const edits = [];

  /**
   * Adds an edit to the edits array if the content differs from the original.
   * @param {string} content - The replacement content.
   * @param {number} start - Start offset in the original text.
   * @param {number} end - End offset in the original text.
   */
  function addEdit(content, start, end) {
    if (!encounteredError && (!selection || (start < selectionEnd && end > selectionOffset)) && text.substring(start, end) !== content) {
      edits.push({
        offset: start,
        length: end - start,
        content
      });
    }
  }

  // Begin scanning and formatting
  let tokenType = scanNextToken();
  if (options.keepLines && lineCount > 0) addEdit(repeatString(eolSequence, lineCount), 0, 0);
  if (tokenType !== 17) { // 17: EOF
    const tokenStart = scanner.getTokenOffset() + selectionStart;
    const indentPrefix = indentString.length * indentationLevel < 20 && options.insertSpaces
      ? DF[indentString.length * indentationLevel]
      : repeatString(indentString, indentationLevel);
    addEdit(indentPrefix, selectionStart, tokenStart);
  }

  while (tokenType !== 17) { // While not EOF
    let tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + selectionStart;
    let nextTokenType = scanNextToken();
    let replacement = "";
    let isLineBreak = false;

    // Handle whitespace and line breaks
    while (lineCount === 0 && (nextTokenType === 12 || nextTokenType === 13)) { // 12: whitespace, 13: line break
      const whitespaceStart = scanner.getTokenOffset() + selectionStart;
      addEdit(DF[1], tokenEnd, whitespaceStart);
      tokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + selectionStart;
      isLineBreak = nextTokenType === 12;
      replacement = isLineBreak ? computeLinePrefix() : "";
      nextTokenType = scanNextToken();
    }

    // Handle indentation and EOL for various token types
    if (nextTokenType === 2) { // 2: closing brace
      if (tokenType !== 1) indentAdjustment--;
      if ((options.keepLines && lineCount > 0) || (!options.keepLines && tokenType !== 1)) {
        replacement = computeLinePrefix();
      } else if (options.keepLines) {
        replacement = DF[1];
      }
    } else if (nextTokenType === 4) { // 4: closing bracket
      if (tokenType !== 3) indentAdjustment--;
      if ((options.keepLines && lineCount > 0) || (!options.keepLines && tokenType !== 3)) {
        replacement = computeLinePrefix();
      } else if (options.keepLines) {
        replacement = DF[1];
      }
    } else {
      switch (tokenType) {
        case 3: // opening bracket
        case 1: // opening brace
          indentAdjustment++;
          if ((options.keepLines && lineCount > 0) || !options.keepLines) {
            replacement = computeLinePrefix();
          } else {
            replacement = DF[1];
          }
          break;
        case 5: // colon
          if ((options.keepLines && lineCount > 0) || !options.keepLines) {
            replacement = computeLinePrefix();
          } else {
            replacement = DF[1];
          }
          break;
        case 12: // whitespace
          replacement = computeLinePrefix();
          break;
        case 13: // line break
          if (lineCount > 0) {
            replacement = computeLinePrefix();
          } else if (!isLineBreak) {
            replacement = DF[1];
          }
          break;
        case 6: // comma
          if (options.keepLines && lineCount > 0) {
            replacement = computeLinePrefix();
          } else if (!isLineBreak) {
            replacement = DF[1];
          }
          break;
        case 10: // comment
          if (options.keepLines && lineCount > 0) {
            replacement = computeLinePrefix();
          } else if (nextTokenType === 6 && !isLineBreak) {
            replacement = "";
          }
          break;
        case 7:
        case 8:
        case 9:
        case 11:
        case 2:
        case 4:
          if (options.keepLines && lineCount > 0) {
            replacement = computeLinePrefix();
          } else if ((nextTokenType === 12 || nextTokenType === 13) && !isLineBreak) {
            replacement = DF[1];
          } else if (nextTokenType !== 5 && nextTokenType !== 17) {
            encounteredError = true;
          }
          break;
        case 16: // error
          encounteredError = true;
          break;
      }
      if (lineCount > 0 && (nextTokenType === 12 || nextTokenType === 13)) {
        replacement = computeLinePrefix();
      }
    }

    // Handle end of file
    if (nextTokenType === 17) {
      if (options.keepLines && lineCount > 0) {
        replacement = computeLinePrefix();
      } else {
        replacement = options.insertFinalNewline ? eolSequence : "";
      }
    }

    const editStart = scanner.getTokenOffset() + selectionStart;
    addEdit(replacement, tokenEnd, editStart);
    tokenType = nextTokenType;
  }

  return edits;
}

module.exports = M;