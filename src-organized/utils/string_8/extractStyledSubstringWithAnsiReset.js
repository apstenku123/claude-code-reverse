/**
 * Extracts a substring from the input string up to a specified maximum length, preserving ANSI styles and appending reset codes as needed.
 * The function splits the input string by a delimiter (from getAnsiEscapeSequenceRegex()), iterates through the segments, and collects them until the maximum length is reached.
 * It also tracks and resets ANSI styles using helper functions.
 *
 * @param {string} inputString - The string to extract the substring from.
 * @param {number} maxLength - The maximum length of the substring to extract.
 * @returns {string} The extracted substring with ANSI reset codes appended as needed.
 */
function extractStyledSubstringWithAnsiReset(inputString, maxLength) {
  // Get the regex for matching ANSI codes
  const ansiRegex = getAnsiEscapeSequenceRegex(true);
  // Split the input string by the delimiter (from getAnsiEscapeSequenceRegex())
  const stringSegments = inputString.split(getAnsiEscapeSequenceRegex());
  let segmentIndex = 0;
  let currentLength = 0;
  let resultString = "";
  let matchResult;
  // Object to track active ANSI styles
  const activeStyles = {};

  // Iterate until the desired length is reached
  while (currentLength < maxLength) {
    // Find the next ANSI code match
    matchResult = ansiRegex.exec(inputString);
    // Get the next string segment
    let currentSegment = stringSegments[segmentIndex];
    segmentIndex++;
    // If adding the current segment would exceed maxLength, truncate isBlobOrFileLikeObject
    if (currentLength + getMaxLineLength(currentSegment) > maxLength) {
      currentSegment = truncateStringByEffectiveLength(currentSegment, maxLength - currentLength);
    }
    // Append the current segment to the result
    resultString += currentSegment;
    currentLength += getMaxLineLength(currentSegment);
    // If handleMissingDoctypeError haven'processRuleBeginHandlers reached maxLength, process the matched ANSI code
    if (currentLength < maxLength) {
      if (!matchResult) break; // No more ANSI codes to process
      // Append the matched ANSI code
      resultString += matchResult[0];
      // Update the active styles object
      applyAnsiColorCode(activeStyles, matchResult);
    }
  }
  // Append ANSI reset codes and process additional style resets
  return appendResetAnsiCodes(activeStyles, resultString);
}

module.exports = extractStyledSubstringWithAnsiReset;