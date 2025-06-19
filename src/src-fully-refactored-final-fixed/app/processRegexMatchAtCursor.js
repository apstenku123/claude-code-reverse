/**
 * Attempts to match a regular expression at the current cursor position in the input string.
 * If a match is found, processes the match based on its capturing groups and updates the cursor position.
 *
 * @returns {boolean} Returns true if a match was found and processed, false otherwise.
 * @throws {Error} Throws if a match is expected but not found (should never happen).
 */
function processRegexMatchAtCursor() {
  // If the cursor is already at the end, do not process further
  if (currentCursorPosition === endOfInputPosition) return false;

  // Set the regex'createInteractionAccessor lastIndex to the current cursor position
  regexPattern.lastIndex = currentCursorPosition;

  // Attempt to execute the regex at the current position
  const matchResult = regexPattern.exec(inputString);
  if (!matchResult) {
    // This should never happen if the input is well-formed
    throw new Error("should never happen");
  }

  const matchedText = matchResult[2]; // The main matched group
  if (!matchedText) return false;

  const optionalPrefix = matchResult[1]; // An optional prefix group

  if (optionalPrefix) {
    // If the optional prefix exists, advance cursor by matchedText length + 2 (for prefix and separator)
    currentCursorPosition += matchedText.length + 2;
    processMatchWithPrefix(prefixHandler, matchedText);
  } else {
    // Otherwise, advance cursor by matchedText length + 1 (for separator)
    currentCursorPosition += matchedText.length + 1;
    lastMatchedText = matchedText;
    processMatchWithoutPrefix(suffixHandler, matchedText, extraContext);
  }
  return true;
}

module.exports = processRegexMatchAtCursor;