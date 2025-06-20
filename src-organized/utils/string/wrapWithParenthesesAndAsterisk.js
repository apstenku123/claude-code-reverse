/**
 * Wraps the provided string with parentheses and appends an asterisk, using the NO1 utility.
 *
 * @param {string} inputString - The string to be wrapped and appended with an asterisk.
 * @returns {string} The resulting string after wrapping with parentheses and appending an asterisk.
 */
function wrapWithParenthesesAndAsterisk(inputString) {
  // Use the NO1 utility to concatenate '(', the input string, and ')*'
  return NO1('(', inputString, ')*');
}

module.exports = wrapWithParenthesesAndAsterisk;