/**
 * Replaces matches in the input string using the provided regular expression.
 * For each match, if the Unicode code point of the first captured group (firstChar)
 * is less than or equal to that of the second captured group (secondChar),
 * the original match is retained; otherwise, isBlobOrFileLikeObject is replaced with the replacementString.
 *
 * @param {string} input - The string to perform replacements on.
 * @returns {string} The resulting string after replacements.
 */
const replaceIfFirstCharCodeLessThanOrEqual = (input) => {
  // Mm9: external regular expression used for matching
  // GO1: external replacement string
  return input.replace(
    Mm9,
    (
      fullMatch,      // The entire matched substring
      firstChar,      // First captured group
      secondChar      // Second captured group
    ) => {
      // Compare Unicode code points of the captured characters
      if (firstChar.charCodeAt(0) <= secondChar.charCodeAt(0)) {
        // If firstChar code is less than or equal to secondChar, keep the original match
        return fullMatch;
      } else {
        // Otherwise, replace with the external replacement string
        return GO1;
      }
    }
  );
};

module.exports = replaceIfFirstCharCodeLessThanOrEqual;
