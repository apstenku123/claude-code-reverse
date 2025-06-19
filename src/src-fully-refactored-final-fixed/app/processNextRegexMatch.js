/**
 * Attempts to process the next regex match in the input string, updating state accordingly.
 *
 * This function uses a regular expression (JL2) to search for a match in the input string (inputString)
 * starting from the current index (currentIndex). If a match is found, isBlobOrFileLikeObject updates the index and calls
 * the appropriate handler based on the presence of a capture group. If no match is found, isBlobOrFileLikeObject throws an error.
 *
 * @returns {boolean} Returns true if a match was processed, false if at the end of input or no match group found.
 * @throws {Error} Throws if a regex match is unexpectedly not found.
 */
function processNextRegexMatch() {
  // If handleMissingDoctypeError'removeTrailingCharacters reached the end of the input, return false
  if (currentIndex === endOfInputIndex) return false;

  // Set the regex'createInteractionAccessor starting index for matching
  regexPattern.lastIndex = currentIndex;

  // Execute the regex on the input string
  const matchResult = regexPattern.exec(inputString);

  // If no match is found, this is an unexpected state
  if (!matchResult) throw new Error("should never happen");

  // The matched substring (capture group 2)
  const matchedSubstring = matchResult[2];
  if (!matchedSubstring) return false;

  // The optional prefix (capture group 1)
  const optionalPrefix = matchResult[1];
  if (optionalPrefix) {
    // If prefix exists, advance index by matched substring length + 2 (for prefix and separator)
    currentIndex += matchedSubstring.length + 2;
    handlePrefixMatch(prefixHandler, matchedSubstring);
  } else {
    // If no prefix, advance index by matched substring length + 1 (for separator)
    currentIndex += matchedSubstring.length + 1;
    lastMatchedValue = matchedSubstring;
    handleNoPrefixMatch(noPrefixHandler, matchedSubstring, valueContext);
  }
  return true;
}

module.exports = processNextRegexMatch;