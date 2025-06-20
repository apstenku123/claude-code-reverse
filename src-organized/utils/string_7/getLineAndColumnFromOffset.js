/**
 * Calculates the line and column number in a string at a given character offset.
 *
 * @param {string} text - The full text to analyze.
 * @param {number} offset - The zero-based character offset within the text.
 * @returns {{ line: number, col: number }} An object containing the line number (1-based) and column number (1-based) at the given offset.
 */
function getLineAndColumnFromOffset(text, offset) {
  // Get the substring from the start up to the offset, then split into lines
  const linesUpToOffset = text.substring(0, offset).split(/\r?\n/);

  // The line number is the number of lines in the split result
  const lineNumber = linesUpToOffset.length;

  // The column number is the length of the last line plus one (1-based index)
  const columnNumber = linesUpToOffset[linesUpToOffset.length - 1].length + 1;

  return {
    line: lineNumber,
    col: columnNumber
  };
}

module.exports = getLineAndColumnFromOffset;