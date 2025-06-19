/**
 * Splits a string into lines, handling both CR (\r) and LF (\n) line endings, and returns
 * an array of lines plus any remaining text after the last line ending.
 *
 * This function is useful for processing text streams where lines may be separated by
 * either CR, LF, or CRLF, and where the input may end with a partial line (no line ending).
 *
 * @param {string} inputText - The text to split into lines.
 * @returns {[string[], string]} a tuple: [array of complete lines, remainder string]
 */
function splitLinesPreserveRemainder(inputText) {
  const lines = [];
  let remainder = "";
  let currentIndex = 0;

  while (currentIndex < inputText.length) {
    // Find the next CR and LF line ending
    const nextCarriageReturn = inputText.indexOf("\r", currentIndex);
    const nextLineFeed = inputText.indexOf("\n", currentIndex);
    let nextLineBreakIndex = -1;

    // Determine the position of the next line break (CR or LF)
    if (nextCarriageReturn !== -1 && nextLineFeed !== -1) {
      nextLineBreakIndex = Math.min(nextCarriageReturn, nextLineFeed);
    } else if (nextCarriageReturn !== -1) {
      nextLineBreakIndex = nextCarriageReturn;
    } else if (nextLineFeed !== -1) {
      nextLineBreakIndex = nextLineFeed;
    }

    if (nextLineBreakIndex === -1) {
      // No more line breaks; the rest is the remainder
      remainder = inputText.slice(currentIndex);
      break;
    } else {
      // Extract the line up to the line break
      const line = inputText.slice(currentIndex, nextLineBreakIndex);
      lines.push(line);
      currentIndex = nextLineBreakIndex + 1;

      // Handle CRLF (\r\n): if the current was CR and the next is LF, skip the LF
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

module.exports = splitLinesPreserveRemainder;