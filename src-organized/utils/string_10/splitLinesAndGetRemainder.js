/**
 * Splits a string into lines, handling both '\r' and '\n' line endings, and returns an array of lines plus any remaining text after the last line ending.
 *
 * @param {string} inputText - The text to be split into lines.
 * @returns {[string[], string]} a tuple: [array of lines, remainder string after the last line ending]
 */
function splitLinesAndGetRemainder(inputText) {
  const lines = [];
  let remainder = "";
  let currentIndex = 0;

  while (currentIndex < inputText.length) {
    // Find the next occurrence of '\r' and '\n'
    const carriageReturnIndex = inputText.indexOf("\r", currentIndex);
    const lineFeedIndex = inputText.indexOf("\n", currentIndex);
    let nextLineBreakIndex = -1;

    // Determine the closest line break (if any)
    if (carriageReturnIndex !== -1 && lineFeedIndex !== -1) {
      nextLineBreakIndex = Math.min(carriageReturnIndex, lineFeedIndex);
    } else if (carriageReturnIndex !== -1) {
      nextLineBreakIndex = carriageReturnIndex;
    } else if (lineFeedIndex !== -1) {
      nextLineBreakIndex = lineFeedIndex;
    }

    if (nextLineBreakIndex === -1) {
      // No more line breaks found; remainder is the rest of the string
      remainder = inputText.slice(currentIndex);
      break;
    } else {
      // Extract the line up to the line break
      const line = inputText.slice(currentIndex, nextLineBreakIndex);
      lines.push(line);
      currentIndex = nextLineBreakIndex + 1;

      // Handle Windows-style '\r\n' line endings by skipping the '\n' after a '\r'
      if (
        inputText[nextLineBreakIndex] === "\r" &&
        inputText[currentIndex] === "\n"
      ) {
        currentIndex++;
      }
    }
  }

  return [lines, remainder];
}

module.exports = splitLinesAndGetRemainder;