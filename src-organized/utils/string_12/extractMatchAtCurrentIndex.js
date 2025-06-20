/**
 * Attempts to extract a match from the input string at the current parsing index using the provided regular expression.
 *
 * @param {RegExp} regexPattern - The regular expression to execute against the input string.
 * @returns {string} The matched substring at the current index, possibly trimmed if certain conditions are met.
 * @throws {Error} If no match is found at the expected index.
 */
function extractMatchAtCurrentIndex(regexPattern) {
  // Set the regex'createInteractionAccessor lastIndex to one before the current parsing index
  regexPattern.lastIndex = currentParseIndex - 1;

  // Attempt to execute the regex on the input string
  const matchResult = regexPattern.exec(inputString);

  // Check if a match was found at the expected position
  if (matchResult && matchResult.index === currentParseIndex - 1) {
    let matchedSubstring = matchResult[0];
    // Advance the parsing index by the length of the match (minus 1)
    currentParseIndex += matchedSubstring.length - 1;

    // If trimming is enabled and handleMissingDoctypeError'removeTrailingCharacters reached the end, trim the last character
    if (shouldTrimOnEnd && currentParseIndex === parseEndIndex) {
      matchedSubstring = matchedSubstring.slice(0, -1);
      currentParseIndex--;
    }
    return matchedSubstring;
  } else {
    throw new Error("should never happen");
  }
}

module.exports = extractMatchAtCurrentIndex;