/**
 * Extracts all matches from the input string using a regular expression and processes them into an object.
 *
 * @param {string} inputString - The string to search for matches.
 * @returns {Object} An object populated by processing each regex match found in the input string.
 */
function extractMatchesToObject(inputString) {
  // Initialize the regular expression with global or specific flags via getAnsiEscapeSequenceRegex
  const regex = getAnsiEscapeSequenceRegex(true);
  // Execute the regex on the input string to find the first match
  let match = regex.exec(inputString);
  // This object will accumulate the processed match data
  const matchesObject = {};

  // Iterate over all matches in the input string
  while (match !== null) {
    // Process the current match and update the matchesObject
    applyAnsiColorCode(matchesObject, match);
    // Find the next match
    match = regex.exec(inputString);
  }

  return matchesObject;
}

module.exports = extractMatchesToObject;