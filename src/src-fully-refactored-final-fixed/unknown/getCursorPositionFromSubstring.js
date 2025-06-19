/**
 * Calculates the cursor position (line and column) after taking a substring of the input text up to a given index.
 *
 * @param {string} text - The full input text from which to extract the substring.
 * @param {number} substringEndIndex - The index up to which the substring is taken (exclusive).
 * @returns {{ line: number, col: number }} An object containing the line number (1-based) and column number (1-based) at the end of the substring.
 */
function getCursorPositionFromSubstring(text, substringEndIndex) {
  // Take the substring from the start up to the specified index
  const substring = text.substring(0, substringEndIndex);
  // Split the substring into lines using both Unix and Windows line endings
  const lines = substring.split(/\r?\n/);
  // The line number is the number of lines in the split result
  const lineNumber = lines.length;
  // The column number is the length of the last line plus one (1-based index)
  const columnNumber = lines[lines.length - 1].length + 1;
  return {
    line: lineNumber,
    col: columnNumber
  };
}

module.exports = getCursorPositionFromSubstring;