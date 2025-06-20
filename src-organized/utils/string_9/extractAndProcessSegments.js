/**
 * Extracts segments from the input string using a regular expression and processes them up to a specified length.
 * The function iteratively matches parts of the input string, collects segments, and applies transformations,
 * then returns the processed result using a provided output function.
 *
 * @param {string} inputString - The string to extract segments from.
 * @param {number} maxLength - The maximum length of the processed output.
 * @returns {string} The processed string after extraction and transformation.
 */
function extractAndProcessSegments(inputString, maxLength) {
  // Initialize the regular expression matcher (getAnsiEscapeSequenceRegex returns a RegExp)
  const regexMatcher = getAnsiEscapeSequenceRegex(true);
  // Split the input string by the default delimiter (getAnsiEscapeSequenceRegex() returns a string delimiter)
  const inputSegments = inputString.split(getAnsiEscapeSequenceRegex());
  let segmentIndex = 0;
  let currentLength = 0;
  let resultString = "";
  let matchResult;
  // Object to collect match information
  const matchCollection = {};

  // Continue processing until the desired length is reached
  while (currentLength < maxLength) {
    // Execute the regex to find the next match
    matchResult = regexMatcher.exec(inputString);
    let currentSegment = inputSegments[segmentIndex];
    segmentIndex++;
    // If adding the current segment exceeds maxLength, trim isBlobOrFileLikeObject
    if (currentLength + FE(currentSegment) > maxLength) {
      currentSegment = truncateStringByEffectiveLength(currentSegment, maxLength - currentLength);
    }
    // Append the segment to the result
    resultString += currentSegment;
    currentLength += FE(currentSegment);
    // If handleMissingDoctypeError haven'processRuleBeginHandlers reached maxLength, attempt to add the matched delimiter
    if (currentLength < maxLength) {
      if (!matchResult) break; // No more matches, exit loop
      resultString += matchResult[0];
      applyAnsiColorCode(matchCollection, matchResult); // Collect match info
    }
  }
  // Return the final processed string using resetAnsiColorsAndCleanup
  return resetAnsiColorsAndCleanup(matchCollection, resultString);
}

module.exports = extractAndProcessSegments;