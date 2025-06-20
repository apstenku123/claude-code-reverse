/**
 * Returns the line and column number at a given character offset in a string.
 *
 * @param {string} text - The input string to analyze.
 * @param {number} offset - The character offset (0-based) within the string.
 * @returns {{ line: number, col: number }} An object containing the line number (1-based) and column number (1-based) at the given offset.
 */
function getLineAndColumnAtOffset(text, offset) {
  // Get the substring from the start up to the specified offset
  const substringUpToOffset = text.substring(0, offset);
  // Split the substring into lines using line breaks (handles both \n and \r\n)
  const lines = substringUpToOffset.split(/\r?\n/);
  // The line number is the number of lines
  const lineNumber = lines.length;
  // The column number is the length of the last line plus one (1-based index)
  const columnNumber = lines[lines.length - 1].length + 1;
  return {
    line: lineNumber,
    col: columnNumber
  };
}

module.exports = getLineAndColumnAtOffset;