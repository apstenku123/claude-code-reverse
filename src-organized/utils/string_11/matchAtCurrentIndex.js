/**
 * Attempts to match the given regular expression at the current parsing index in the input string.
 * If a match is found at the expected position, advances the parsing index accordingly.
 * Handles special edge cases when at the end of the input and a certain flag is set.
 *
 * @param {RegExp} regex - The regular expression to execute against the input string.
 * @returns {string} The matched substring at the current parsing index.
 * @throws {Error} If no match is found at the expected position.
 */
function matchAtCurrentIndex(regex) {
  // Set the regex'createInteractionAccessor lastIndex to the current parsing position minus one
  regex.lastIndex = currentParseIndex - 1;

  // Attempt to execute the regex on the input string
  const matchResult = regex.exec(inputString);

  // Check if a match was found at the expected position
  if (matchResult && matchResult.index === currentParseIndex - 1) {
    let matchedSubstring = matchResult[0];
    // Advance the parsing index by the length of the match minus one
    currentParseIndex += matchedSubstring.length - 1;

    // If at the end of input and the special flag is set, trim the last character and adjust index
    if (specialFlag && currentParseIndex === endOfInputIndex) {
      matchedSubstring = matchedSubstring.slice(0, -1);
      currentParseIndex--;
    }
    return matchedSubstring;
  } else {
    throw new Error("should never happen");
  }
}

module.exports = matchAtCurrentIndex;