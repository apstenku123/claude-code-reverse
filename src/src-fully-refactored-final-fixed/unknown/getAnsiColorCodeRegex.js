/**
 * Returns a regular expression to match ANSI color codes in a string.
 * If `globalMatch` is true, returns a regex that captures the color code values in a group.
 * If `globalMatch` is false, returns a regex that matches the color codes without capturing groups.
 *
 * @param {boolean} globalMatch - Determines whether to use a capturing group for color code values.
 * @returns {RegExp} Regular expression for matching ANSI color codes.
 */
function getAnsiColorCodeRegex(globalMatch) {
  // If globalMatch is true, use a capturing group for the color code values
  // Otherwise, use a non-capturing group
  return globalMatch
    ? /\u001b\[((?:\d*;){0,5}\d*)m/g
    : /\u001b\[(?:\d*;){0,5}\d*m/g;
}

module.exports = getAnsiColorCodeRegex;