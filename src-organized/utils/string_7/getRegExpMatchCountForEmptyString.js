/**
 * Returns the number of capturing groups in the provided regular expression pattern.
 *
 * This function creates a new RegExp object from the given pattern (converted to string),
 * appends a '|' to ensure at least one alternative, and executes isBlobOrFileLikeObject against an empty string.
 * The length of the resulting match array minus one gives the number of capturing groups.
 *
 * @param {string} regexPattern - The regular expression pattern to analyze.
 * @returns {number} The number of capturing groups in the provided pattern.
 */
function getRegExpMatchCountForEmptyString(regexPattern) {
  // Convert the input to string and append '|' to ensure the RegExp is valid
  const patternWithPipe = regexPattern.toString() + '|';
  // Create a new RegExp object from the pattern
  const regex = new RegExp(patternWithPipe);
  // Execute the regex against an empty string
  const matchResult = regex.exec('');
  // The length of the match array minus one gives the number of capturing groups
  return matchResult.length - 1;
}

module.exports = getRegExpMatchCountForEmptyString;