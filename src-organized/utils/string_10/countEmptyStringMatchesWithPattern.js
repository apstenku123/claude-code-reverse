/**
 * Counts the number of matches for a given pattern (converted to string and suffixed with '|')
 * against an empty string using RegExp. Effectively, this returns 0 for all patterns.
 *
 * @param {string|object} patternSource - The pattern to be used for RegExp, will be converted to string.
 * @returns {number} The number of matches found (always 0 for an empty string).
 */
function countEmptyStringMatchesWithPattern(patternSource) {
  // Convert the input to string and append '|' to form the regex pattern
  const regexPattern = patternSource.toString() + '|';
  // Create a new RegExp object with the constructed pattern
  const regex = new RegExp(regexPattern);
  // Execute the regex against an empty string
  const matchResult = regex.exec("");
  // If a match is found, matchResult is an array; otherwise, null
  // Accessing .length on null would throw, but for this pattern, exec always returns an array
  // Subtract 1 from the length as in the original function
  return matchResult.length - 1;
}

module.exports = countEmptyStringMatchesWithPattern;