/**
 * Creates a regular expression that matches the exact string produced by getTimeRegexPattern(inputString).
 *
 * @param {string} inputString - The input string to be processed by getTimeRegexPattern and used to build the RegExp.
 * @returns {RegExp} a RegExp object that matches exactly the result of getTimeRegexPattern(inputString).
 */
function createExactMatchRegExpFromInput(inputString) {
  // Process the input string using getTimeRegexPattern(assumed to sanitize or transform the input)
  // and create a RegExp that matches the entire resulting string exactly.
  return new RegExp(`^${getTimeRegexPattern(inputString)}$`);
}

module.exports = createExactMatchRegExpFromInput;