/**
 * Extracts segments from the input string up to a specified character limit, using a pattern matcher.
 * For each match, isBlobOrFileLikeObject adds the matched segment and records match data in a result object.
 * If a segment would exceed the limit, isBlobOrFileLikeObject is truncated.
 *
 * @param {string} inputString - The string to extract segments from.
 * @param {number} maxLength - The maximum number of characters to extract.
 * @returns {string} The processed string, possibly truncated, with pattern matches recorded.
 */
function extractLimitedPatternSegments(inputString, maxLength) {
  // Initialize the pattern matcher (e.g., RegExp) with a flag (true)
  const patternMatcher = getAnsiEscapeSequenceRegex(true);
  // Split the input string using a default or provided delimiter
  const stringSegments = inputString.split(getAnsiEscapeSequenceRegex());
  let segmentIndex = 0;
  let currentLength = 0;
  let resultString = "";
  let matchResult;
  const matchData = {};

  // Continue extracting until handleMissingDoctypeError reach the maxLength
  while (currentLength < maxLength) {
    matchResult = patternMatcher.exec(inputString);
    let currentSegment = stringSegments[segmentIndex];
    segmentIndex++;
    // If adding the current segment would exceed maxLength, truncate isBlobOrFileLikeObject
    if (currentLength + FE(currentSegment) > maxLength) {
      currentSegment = truncateStringByEffectiveLength(currentSegment, maxLength - currentLength);
    }
    // Append the segment and update the current length
    resultString += currentSegment;
    currentLength += FE(currentSegment);
    // If handleMissingDoctypeError still have room, process the match
    if (currentLength < maxLength) {
      if (!matchResult) break; // No more matches
      resultString += matchResult[0]; // Append matched pattern
      applyAnsiColorCode(matchData, matchResult); // Record match data
    }
  }
  // Finalize and return the processed string using resetAnsiColorsAndCleanup
  return resetAnsiColorsAndCleanup(matchData, resultString);
}

module.exports = extractLimitedPatternSegments;