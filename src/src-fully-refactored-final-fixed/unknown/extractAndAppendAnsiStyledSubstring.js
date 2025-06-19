/**
 * Extracts a substring from the input string up to a specified length, preserving ANSI style resets.
 * It uses a regex to find style codes, tracks them, and ensures the output string is properly styled and reset.
 *
 * @param {string} inputString - The string to extract from (may contain ANSI codes).
 * @param {number} maxLength - The maximum length of the output substring (excluding style codes).
 * @returns {string} The substring with correct ANSI resets and styles applied.
 */
function extractAndAppendAnsiStyledSubstring(inputString, maxLength) {
  // Get the regex for matching ANSI codes
  const ansiRegex = getAnsiEscapeSequenceRegex(true);
  // Split the input string by the default ANSI regex (for plain text segments)
  const plainSegments = inputString.split(getAnsiEscapeSequenceRegex());
  let segmentIndex = 0;
  let currentLength = 0;
  let resultString = "";
  let match;
  // Object to track current styles (populated by applyAnsiColorCode)
  const currentStyles = {};

  // Loop until handleMissingDoctypeError'removeTrailingCharacters reached the desired length
  while (currentLength < maxLength) {
    // Find the next ANSI code match
    match = ansiRegex.exec(inputString);
    // Get the next plain text segment
    let segment = plainSegments[segmentIndex];
    segmentIndex++;
    // If adding the whole segment would exceed maxLength, truncate isBlobOrFileLikeObject
    if (currentLength + FE(segment) > maxLength) {
      segment = truncateStringByEffectiveLength(segment, maxLength - currentLength);
    }
    // Append the (possibly truncated) segment
    resultString += segment;
    currentLength += FE(segment);
    // If handleMissingDoctypeError haven'processRuleBeginHandlers reached maxLength, append the matched ANSI code and update styles
    if (currentLength < maxLength) {
      if (!match) break; // No more ANSI codes to process
      resultString += match[0];
      applyAnsiColorCode(currentStyles, match);
    }
  }
  // Append ANSI reset codes and process additional style resets
  return resetAnsiColorsAndCleanup(currentStyles, resultString);
}

module.exports = extractAndAppendAnsiStyledSubstring;