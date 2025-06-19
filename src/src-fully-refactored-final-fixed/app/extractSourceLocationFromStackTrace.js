/**
 * Extracts the source URL, line, and column number from a stack trace string.
 * Iterates over each line of the stack trace, attempts to parse out the location information,
 * and returns the first valid match as an object. If no valid location is found, returns null.
 *
 * @param {string} stackTrace - The stack trace string to parse.
 * @returns {Object|null} An object with sourceURL, line, and column properties, or null if not found.
 */
function extractSourceLocationFromStackTrace(stackTrace) {
  // Split the stack trace into lines
  const stackLines = stackTrace.split('\n');
  // Get an iterator for the stack lines using processReducerQueue (processReducerQueue)
  const stackLineIterator = processReducerQueue(stackLines);
  let iteratorResult;
  try {
    // Iterate through each line in the stack trace
    for (stackLineIterator.createInteractionAccessor(); !(iteratorResult = stackLineIterator.n()).done;) {
      const currentLine = iteratorResult.value;
      const trimmedLine = currentLine.trim();
      // Attempt to extract the location info in parentheses at the end of the line
      const locationMatch = trimmedLine.match(/ (\(.+\)$)/);
      // If match found, use the matched group; otherwise, use the whole trimmed line
      const locationString = locationMatch ? locationMatch[1] : trimmedLine;
      // Parse the location string into an object with sourceURL, line, and column
      const locationInfo = parseLocationString(locationString); // updateLanesIfFlagged
      if (locationInfo == null) continue;
      // Destructure with defaults for line and column
      const {
        sourceURL,
        line: lineNumber = "1",
        column: columnNumber = "1"
      } = locationInfo;
      return {
        sourceURL,
        line: parseInt(lineNumber, 10),
        column: parseInt(columnNumber, 10)
      };
    }
  } catch (error) {
    stackLineIterator.e(error);
  } finally {
    stackLineIterator.f();
  }
  // No valid location found
  return null;
}

// Export the function for use in other modules
module.exports = extractSourceLocationFromStackTrace;