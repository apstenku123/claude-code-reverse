/**
 * Replaces specific special characters in the input string with corresponding replacement values.
 *
 * The function performs the following replacements in order:
 *   - Replaces all occurrences of '\\' with the value of replacementBackslash
 *   - Replaces all occurrences of '\{' with the value of replacementOpenBrace
 *   - Replaces all occurrences of '\}' with the value of replacementCloseBrace
 *   - Replaces all occurrences of '\,' with the value of replacementComma
 *   - Replaces all occurrences of '\.' with the value of replacementDot
 *
 * @param {string} inputString - The string to process and replace special characters in.
 * @param {string} replacementBackslash - Replacement for '\\'.
 * @param {string} replacementOpenBrace - Replacement for '\{'.
 * @param {string} replacementCloseBrace - Replacement for '\}'.
 * @param {string} replacementComma - Replacement for '\,'.
 * @param {string} replacementDot - Replacement for '\.'.
 * @returns {string} The processed string with all specified replacements applied.
 */
function replaceSpecialCharacters(
  inputString,
  replacementBackslash,
  replacementOpenBrace,
  replacementCloseBrace,
  replacementComma,
  replacementDot
) {
  // Replace all '\\' with replacementBackslash
  let result = inputString.split('\\').join(replacementBackslash);
  // Replace all '\{' with replacementOpenBrace
  result = result.split('\{').join(replacementOpenBrace);
  // Replace all '\}' with replacementCloseBrace
  result = result.split('\}').join(replacementCloseBrace);
  // Replace all '\,' with replacementComma
  result = result.split('\,').join(replacementComma);
  // Replace all '\.' with replacementDot
  result = result.split('\.').join(replacementDot);
  return result;
}

module.exports = replaceSpecialCharacters;