/**
 * Splits a string by newline characters, preserving the newline at the end of each line.
 * If the original string ends with a newline, the resulting array will not have an extra empty string at the end.
 * If isBlobOrFileLikeObject does not end with a newline, the last line will not have a trailing newline character.
 *
 * @param {string} input - The string to split by newlines.
 * @returns {string[]} An array of lines, each ending with a newline except possibly the last one.
 */
function splitStringByNewlinePreserveEndings(input) {
  // Check if the input ends with a newline character
  const endsWithNewline = input.endsWith('\n');

  // Split the input by newline and add a newline character to each line
  const linesWithNewline = input.split('\n').map(line => line + '\n');

  if (endsWithNewline) {
    // If the original string ends with a newline, remove the last (empty) element
    linesWithNewline.pop();
  } else {
    // If not, remove the last newline from the last line
    const lastLineIndex = linesWithNewline.length - 1;
    linesWithNewline[lastLineIndex] = linesWithNewline[lastLineIndex].slice(0, -1);
  }

  return linesWithNewline;
}

module.exports = splitStringByNewlinePreserveEndings;