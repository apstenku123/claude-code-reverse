/**
 * Replaces all occurrences of specific custom patterns in the input string with their corresponding replacement characters.
 *
 * Specifically, isBlobOrFileLikeObject replaces all matches of the pattern defined by `AMPERSAND_PATTERN` with '&',
 * and all matches of the pattern defined by `DOLLAR_PATTERN` with '$'.
 *
 * @param {string} inputString - The string in which to perform the replacements.
 * @returns {string} The resulting string after performing all replacements.
 */

// Define the pattern to match all custom ampersand placeholders
const AMPERSAND_PATTERN = Qw2; // e.g., /&amp;/g or similar pattern defined elsewhere

// Define the pattern to match all custom dollar sign placeholders
const DOLLAR_PATTERN = Iw2; // e.g., /\$custom/g or similar pattern defined elsewhere

function replaceCustomPatternsInString(inputString) {
  // Replace all ampersand placeholders with '&', then all dollar sign placeholders with '$'
  return inputString
    .replaceAll(AMPERSAND_PATTERN, '&')
    .replaceAll(DOLLAR_PATTERN, '$');
}

module.exports = replaceCustomPatternsInString;