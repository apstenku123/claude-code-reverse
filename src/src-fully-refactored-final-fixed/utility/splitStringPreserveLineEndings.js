/**
 * Splits a string into an array of lines, preserving line endings. Each line in the returned array ends with a newline character (`\n`).
 * If the original string does not end with a newline, the last line in the array will not have a trailing newline.
 *
 * @param {string} input - The input string to split into lines.
 * @returns {string[]} An array of lines, each ending with a newline character except possibly the last line.
 */
function splitStringPreserveLineEndings(input) {
  // Check if the input string ends with a newline character
  const endsWithNewline = input.endsWith('\n');

  // Split the input into lines and append a newline to each line
  const linesWithNewline = input.split('\n').map(line => line + '\n');

  if (endsWithNewline) {
    // If the original string ends with a newline, remove the last empty line
    linesWithNewline.pop();
  } else {
    // If not, remove the extra newline from the last line
    const lastLine = linesWithNewline.pop();
    // Remove the last character (the added newline)
    linesWithNewline.push(lastLine.slice(0, -1));
  }

  return linesWithNewline;
}

module.exports = splitStringPreserveLineEndings;
