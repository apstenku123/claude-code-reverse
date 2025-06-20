/**
 * Determines the predominant line ending style (CRLF or LF) in a given string.
 *
 * @param {string} text - The input string to analyze for line endings.
 * @returns {string} Returns 'CRLF' if CRLF (\r\n) line endings are more common, otherwise returns 'LF'.
 */
function detectLineEndingStyle(text) {
  let crlfCount = 0; // Count of CRLF (\r\n) line endings
  let lfCount = 0;   // Count of LF (\n) line endings not preceded by \r

  // Iterate through the string to count line endings
  for (let index = 0; index < text.length; index++) {
    if (text[index] === '\n') {
      // Check if the previous character is a carriage return
      if (index > 0 && text[index - 1] === '\r') {
        crlfCount++;
      } else {
        lfCount++;
      }
    }
  }

  // Return the predominant line ending style
  return crlfCount > lfCount ? 'CRLF' : 'LF';
}

module.exports = detectLineEndingStyle;