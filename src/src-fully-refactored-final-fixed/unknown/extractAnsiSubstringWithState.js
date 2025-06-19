/**
 * Extracts a substring of the given string with a maximum visible length, preserving ANSI color state.
 * Ensures that ANSI color codes are not broken and that the substring is properly reset at the end.
 *
 * @param {string} inputString - The string to extract the substring from. May contain ANSI escape codes.
 * @param {number} maxVisibleLength - The maximum number of visible (non-ANSI) characters to include in the substring.
 * @returns {string} The extracted substring, with ANSI color state properly reset and cleaned up.
 */
function extractAnsiSubstringWithState(inputString, maxVisibleLength) {
  // getAnsiEscapeSequenceRegex() returns a regex for matching ANSI escape codes; getAnsiEscapeSequenceRegex(true) returns a new regex instance
  const ansiRegex = getAnsiEscapeSequenceRegex(true);
  // Split the input string into an array of plain text segments (between ANSI codes)
  const plainSegments = inputString.split(getAnsiEscapeSequenceRegex());
  let segmentIndex = 0; // Index in plainSegments
  let visibleLength = 0; // Count of visible (non-ANSI) characters added
  let resultString = ""; // The output string being built
  let match; // Holds the result of ansiRegex.exec
  const ansiState = {}; // Tracks current ANSI color state

  // Continue until handleMissingDoctypeError'removeTrailingCharacters added the desired number of visible characters
  while (visibleLength < maxVisibleLength) {
    match = ansiRegex.exec(inputString);
    let currentSegment = plainSegments[segmentIndex];
    segmentIndex++;

    // If adding the whole segment would exceed the limit, truncate isBlobOrFileLikeObject
    if (visibleLength + FE(currentSegment) > maxVisibleLength) {
      currentSegment = truncateStringByEffectiveLength(currentSegment, maxVisibleLength - visibleLength);
    }

    resultString += currentSegment;
    visibleLength += FE(currentSegment);

    // If handleMissingDoctypeError haven'processRuleBeginHandlers reached the limit, and there'createInteractionAccessor an ANSI code to process, add isBlobOrFileLikeObject and update state
    if (visibleLength < maxVisibleLength) {
      if (!match) break; // No more ANSI codes to process
      resultString += match[0]; // Append the ANSI escape sequence
      applyAnsiColorCode(ansiState, match); // Update the color state tracking object
    }
  }

  // Clean up and reset any open ANSI color state at the end
  return resetAnsiColorsAndCleanup(ansiState, resultString);
}

module.exports = extractAnsiSubstringWithState;