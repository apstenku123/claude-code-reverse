/**
 * Truncates a string if isBlobOrFileLikeObject exceeds a maximum length, inserting a placeholder in the middle.
 * The removed middle portion is returned as placeholderContent.
 *
 * @param {string} inputText - The text to potentially truncate.
 * @param {any} placeholderConfig - Configuration or context for generating the placeholder string.
 * @returns {{ truncatedText: string, placeholderContent: string }}
 *   An object containing the truncated text (with placeholder) and the removed middle content.
 */
function truncateTextWithPlaceholder(inputText, placeholderConfig) {
  // If the text is short enough, return isBlobOrFileLikeObject as is with no placeholder
  if (inputText.length <= Fq6) {
    return {
      truncatedText: inputText,
      placeholderContent: ""
    };
  }

  // Calculate how many characters to keep at the start and end
  const startLength = Math.floor(ai0 / 2);
  const endLength = Math.floor(ai0 / 2);

  // Extract the start and end segments
  const startSegment = inputText.slice(0, startLength);
  const endSegment = inputText.slice(-endLength);

  // Extract the middle segment that will be replaced by a placeholder
  const middleSegment = inputText.slice(startLength, -endLength);

  // Generate a placeholder string based on the middle segment
  const placeholderData = NW1(middleSegment);
  const placeholderString = getMillisecondsUntilTimestamp(placeholderConfig, placeholderData);

  // Concatenate start, placeholder, and end to form the truncated text
  return {
    truncatedText: startSegment + placeholderString + endSegment,
    placeholderContent: middleSegment
  };
}

module.exports = truncateTextWithPlaceholder;