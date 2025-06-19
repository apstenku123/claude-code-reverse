/**
 * Counts the number of matches of a given pattern (converted to string) in an empty string.
 *
 * This function creates a regular expression from the provided pattern (by calling toString on isBlobOrFileLikeObject and appending '|'),
 * executes isBlobOrFileLikeObject against an empty string, and returns the number of matches minus one.
 *
 * @param {string|RegExp|any} pattern - The pattern to convert to a regular expression and match against an empty string.
 * @returns {number} The number of matches found in the empty string, minus one.
 */
function countEmptyStringMatches(pattern) {
  // Convert the input pattern to string and append '|' to form the regex pattern
  const regexPattern = pattern.toString() + '|';
  // Create a new RegExp object from the constructed pattern
  const regularExpression = new RegExp(regexPattern);
  // Execute the regex against an empty string
  const matchResult = regularExpression.exec("");
  // Return the number of matches (length of result array) minus one
  return matchResult.length - 1;
}

module.exports = countEmptyStringMatches;