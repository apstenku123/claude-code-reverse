/**
 * Escapes angle brackets in a string by replacing '<' with '&lt;' and '>' with '&gt;'.
 *
 * @param {string} inputString - The string in which to escape angle brackets.
 * @returns {string} The input string with '<' and '>' replaced by their HTML entities.
 */
const ANGLE_BRACKET_LEFT_REGEX = /</g;
const ANGLE_BRACKET_RIGHT_REGEX = />/g;

function escapeAngleBrackets(inputString) {
  // Replace all '<' with '&lt;' and all '>' with '&gt;'
  return inputString
    .replace(ANGLE_BRACKET_LEFT_REGEX, '&lt;')
    .replace(ANGLE_BRACKET_RIGHT_REGEX, '&gt;');
}

module.exports = escapeAngleBrackets;