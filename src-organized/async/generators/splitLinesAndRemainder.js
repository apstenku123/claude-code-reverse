/**
 * Splits a string into lines using CR (\r), LF (\n), or CRLF (\r\n) as delimiters.
 * Returns an array of lines and any remaining text after the last line break.
 *
 * @param {string} inputText - The text to split into lines.
 * @returns {[string[], string]} - a tuple: [array of lines, remainder string]
 */
function splitLinesAndRemainder(inputText) {
  const lines = [];
  let remainder = "";
  let currentIndex = 0;

  while (currentIndex < inputText.length) {
    // Find the next CR and LF
    const nextCR = inputText.indexOf("\r", currentIndex);
    const nextLF = inputText.indexOf("\n", currentIndex);
    let nextBreak = -1;

    // Determine the position of the next line break (CR or LF)
    if (nextCR !== -1 && nextLF !== -1) {
      nextBreak = Math.min(nextCR, nextLF);
    } else if (nextCR !== -1) {
      nextBreak = nextCR;
    } else if (nextLF !== -1) {
      nextBreak = nextLF;
    }

    if (nextBreak === -1) {
      // No more line breaks; the rest is remainder
      remainder = inputText.slice(currentIndex);
      break;
    } else {
      // Extract the line up to the break
      const line = inputText.slice(currentIndex, nextBreak);
      lines.push(line);
      currentIndex = nextBreak + 1;

      // If CRLF, skip the LF after CR
      if (
        inputText[nextBreak] === "\r" &&
        inputText[currentIndex] === "\n"
      ) {
        currentIndex++;
      }
    }
  }

  return [lines, remainder];
}

module.exports = splitLinesAndRemainder;