/**
 * Replaces all occurrences of specified patterns in the input string with their corresponding replacements.
 *
 * @param {string} inputString - The string to perform replacements on.
 * @returns {string} - The resulting string after all replacements.
 */
function replacePatternsInString(inputString) {
  // VY9 is expected to be an array of [pattern, replacement] pairs
  // For each pattern-replacement pair, replace all occurrences (case-insensitive, global) in the string
  return VY9.reduce((resultString, [pattern, replacement]) => {
    // Create a new RegExp for each pattern with global and case-insensitive flags
    const regex = new RegExp(pattern, 'gi');
    return resultString.replace(regex, replacement);
  }, inputString);
}

module.exports = replacePatternsInString;