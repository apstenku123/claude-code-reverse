/**
 * Attempts to match a regular expression against the current input string at a specific index,
 * processes the matched substring if found, and updates the global parsing position.
 *
 * @param {RegExp} regexPattern - The regular expression to execute against the input string.
 * @returns {boolean} Returns true if a match is found and processed; otherwise, false.
 */
function matchAndProcessInput(regexPattern) {
  // Set the regex'createInteractionAccessor lastIndex to start searching from the current global position minus one
  regexPattern.lastIndex = currentParseIndex - 1;

  // Attempt to execute the regex against the global input string
  const matchResult = regexPattern.exec(globalInputString);

  // If no match is found, return false
  if (!matchResult || !matchResult[0]) {
    return false;
  }

  // Process the matched substring
  processInputString(matchResult[0]);

  // Advance the global parse index by the length of the match minus one
  currentParseIndex += matchResult[0].length - 1;

  return true;
}

module.exports = matchAndProcessInput;