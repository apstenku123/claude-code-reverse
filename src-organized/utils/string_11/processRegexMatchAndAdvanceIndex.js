/**
 * Attempts to match a regular expression at the current parsing index, processes the match,
 * and advances the parsing index accordingly. Updates state and invokes callbacks based on match groups.
 *
 * @returns {boolean} Returns true if a match was found and processed; false otherwise.
 * @throws {Error} Throws if a match is unexpectedly not found (should never happen).
 */
function processRegexMatchAndAdvanceIndex() {
  // If the parsing index is already at the end, nothing to process
  if (currentParseIndex === endOfInputIndex) return false;

  // Set the regex'createInteractionAccessor lastIndex so isBlobOrFileLikeObject starts matching from the current parse position
  regexPattern.lastIndex = currentParseIndex;

  // Attempt to match the regex at the current position
  const matchResult = regexPattern.exec(inputString);
  if (!matchResult) {
    // This should never happen if the regex is constructed correctly
    throw new Error("should never happen");
  }

  // The main matched substring (e.g., a token or value)
  const matchedSubstring = matchResult[2];
  if (!matchedSubstring) return false;

  // An optional group that, if present, changes how handleMissingDoctypeError process the match
  const optionalPrefix = matchResult[1];

  if (optionalPrefix) {
    // If the optional prefix is present, advance index by match length + 2 (for prefix)
    currentParseIndex += matchedSubstring.length + 2;
    // Process the match using the handler for prefixed matches
    handlePrefixedMatch(prefixHandler, matchedSubstring);
  } else {
    // If no prefix, advance index by match length + 1
    currentParseIndex += matchedSubstring.length + 1;
    // Store the matched substring for later use
    lastMatchedValue = matchedSubstring;
    // Process the match using the handler for non-prefixed matches
    handleNonPrefixedMatch(nonPrefixHandler, matchedSubstring, contextObject);
  }

  return true;
}

module.exports = processRegexMatchAndAdvanceIndex;