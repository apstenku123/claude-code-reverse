/**
 * Replaces all occurrences of the pattern defined by COLON_PATTERN with a colon (':'),
 * and all occurrences of the pattern defined by SPACE_PATTERN with a space (' '), in the input string.
 *
 * @param {string} inputString - The string to process and replace patterns in.
 * @returns {string} The processed string with replacements applied.
 */
function replaceColonsAndSpaces(inputString) {
  // Replace all matches of COLON_PATTERN with ':'
  const replacedColons = inputString.replace(COLON_PATTERN, ':');
  // Replace all matches of SPACE_PATTERN with ' '
  const replacedSpaces = replacedColons.replace(SPACE_PATTERN, ' ');
  return replacedSpaces;
}

module.exports = replaceColonsAndSpaces;