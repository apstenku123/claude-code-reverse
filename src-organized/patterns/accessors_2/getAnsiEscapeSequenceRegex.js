/**
 * Returns a regular expression to match ANSI escape sequences in text.
 * The returned regex differs based on the `captureGroups` parameter:
 *   - If `captureGroups` is true, the regex includes a capture group for the parameters.
 *   - If `captureGroups` is false, the regex matches the sequence without capturing.
 *
 * @param {boolean} captureGroups - Whether to include a capture group for the parameters in the regex.
 * @returns {RegExp} a regular expression for matching ANSI escape sequences.
 */
function getAnsiEscapeSequenceRegex(captureGroups) {
  // If captureGroups is true, include a capture group for the parameters
  if (captureGroups) {
    // Matches: ESC [ (up to 5 groups of digits and semicolons) m
    // Example: '\u001b[31m', '\u001b[1;32;40m'
    return /\u001b\[((?:\d*;){0,5}\d*)m/g;
  } else {
    // Matches: ESC [ (up to 5 groups of digits and semicolons) m, no capture group
    return /\u001b\[(?:\d*;){0,5}\d*m/g;
  }
}

module.exports = getAnsiEscapeSequenceRegex;