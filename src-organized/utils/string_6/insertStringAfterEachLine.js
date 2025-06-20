/**
 * Inserts a specified string after each line in the input text, appending an optional suffix after each insertion.
 * Handles both Unix (\n) and Windows (\r\n) line endings.
 *
 * @param {string} inputText - The source text to process.
 * @param {string} insertString - The string to insert after each line.
 * @param {string} lineSuffix - The string to append after each line (after insertString).
 * @returns {string} The processed string with insertString and lineSuffix inserted after each line.
 */
function insertStringAfterEachLine(inputText, insertString, lineSuffix) {
  let currentIndex = 0;
  let result = "";
  let nextLineBreakIndex = inputText.indexOf("\n", currentIndex);

  // Loop through each line in the input text
  while (nextLineBreakIndex !== -1) {
    // Check if the line ends with a carriage return (Windows line ending)
    const hasCarriageReturn = inputText[nextLineBreakIndex - 1] === "\r";
    // Calculate the end index for the current line (exclude \r if present)
    const lineEndIndex = hasCarriageReturn ? nextLineBreakIndex - 1 : nextLineBreakIndex;
    // Extract the current line
    const line = inputText.substring(currentIndex, lineEndIndex);
    // Append the line, the insertString, the original line ending, and the lineSuffix
    result += line + insertString + (hasCarriageReturn ? "\r\n" : "\n") + lineSuffix;
    // Move to the start of the next line
    currentIndex = nextLineBreakIndex + 1;
    nextLineBreakIndex = inputText.indexOf("\n", currentIndex);
  }
  // Append any remaining text after the last line break
  result += inputText.substring(currentIndex);
  return result;
}

module.exports = insertStringAfterEachLine;
