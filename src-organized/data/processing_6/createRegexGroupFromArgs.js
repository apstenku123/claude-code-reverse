/**
 * Creates a regular expression group (in parentheses) from the provided arguments,
 * transforming each argument using the getSourceString function and joining them with a pipe (|).
 *
 * @param {...any} regexParts - The parts to be included in the regex group. Each part is processed by the getSourceString function.
 * @returns {string} a string representing a regex group with the processed parts separated by '|'.
 */
function createRegexGroupFromArgs(...regexParts) {
  // Transform each part using the getSourceString function, then join with '|', and wrap in parentheses
  return '(' + regexParts.map(part => getSourceString(part)).join('|') + ')';
}

module.exports = createRegexGroupFromArgs;