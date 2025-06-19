/**
 * Splits a string into an array of lines, preserving trailing newlines on each line.
 * If the original string ends with a newline, the resulting array will not include an extra empty string at the end.
 * If not, the last line will have its trailing newline removed.
 *
 * @param {string} input - The string to split into lines, each ending with a newline character.
 * @returns {string[]} An array of lines, each ending with a newline character, except possibly the last line.
 */
function splitLinesWithTrailingNewline(input) {
  // Check if the input ends with a newline character
  const endsWithNewline = input.endsWith('\n');

  // Split the input into lines and append a newline character to each line
  const linesWithNewline = input.split('\n').map(function(line) {
    return line + '\n';
  });

  if (endsWithNewline) {
    // If the input ends with a newline, remove the last (empty) line
    linesWithNewline.pop();
  } else {
    // If not, remove the trailing newline from the last line
    const lastLine = linesWithNewline.pop();
    linesWithNewline.push(lastLine.slice(0, -1));
  }

  return linesWithNewline;
}

module.exports = splitLinesWithTrailingNewline;