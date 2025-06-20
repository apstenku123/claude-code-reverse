/**
 * Inserts a specified string after each line in the input text, followed by an optional suffix.
 * Handles both Unix (\n) and Windows (\r\n) line endings.
 *
 * @param {string} inputText - The source text to process.
 * @param {string} insertString - The string to insert after each line.
 * @param {string} suffix - The string to append after each inserted string.
 * @returns {string} The processed text with insertString and suffix added after each line.
 */
function insertStringAfterEachLine(inputText, insertString, suffix) {
  let currentIndex = 0;
  let result = "";
  // Find the index of the next line break
  let nextLineBreakIndex = inputText.indexOf("\n", currentIndex);

  // Process each line until no more line breaks are found
  while (nextLineBreakIndex !== -1) {
    // Check if the line ends with a carriage return (Windows line ending)
    const endsWithCarriageReturn = inputText[nextLineBreakIndex - 1] === "\r";
    // Extract the line, excluding the line break
    const line = inputText.slice(
      currentIndex,
      endsWithCarriageReturn ? nextLineBreakIndex - 1 : nextLineBreakIndex
    );
    // Append the line, the insertString, and the appropriate line ending plus suffix
    result +=
      line +
      insertString +
      (endsWithCarriageReturn ? "\r\n" : "\n") +
      suffix;
    // Move the current index to the character after the line break
    currentIndex = nextLineBreakIndex + 1;
    // Find the next line break
    nextLineBreakIndex = inputText.indexOf("\n", currentIndex);
  }
  // Append any remaining text after the last line break
  result += inputText.slice(currentIndex);
  return result;
}

module.exports = insertStringAfterEachLine;