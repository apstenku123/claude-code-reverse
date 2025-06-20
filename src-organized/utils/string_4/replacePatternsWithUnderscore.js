/**
 * Replaces all occurrences of two specific patterns in the input string with underscores ('_').
 *
 * @param {string} inputString - The string to process and replace patterns in.
 * @returns {string} - The processed string with patterns replaced by underscores.
 */
function replacePatternsWithUnderscore(inputString) {
  // EZ6 and UZ6 are assumed to be regular expressions matching the patterns to replace.
  // These should be defined/imported elsewhere in your codebase.
  return inputString
    .replace(EZ6, "_") // Replace all matches of EZ6 with '_'
    .replace(UZ6, "_"); // Replace all matches of UZ6 with '_'
}

module.exports = replacePatternsWithUnderscore;