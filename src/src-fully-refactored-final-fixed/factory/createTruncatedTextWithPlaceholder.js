/**
 * Truncates a string if isBlobOrFileLikeObject exceeds a specified maximum length, inserting a placeholder in the middle.
 * The placeholder is generated based on a transformation of the omitted middle section and an external config.
 *
 * @param {string} originalText - The text to potentially truncate.
 * @param {any} config - Configuration or context used by the placeholder generator.
 * @returns {{ truncatedText: string, placeholderContent: string }}
 *   An object containing the truncated text (with placeholder) and the omitted middle section as placeholder content.
 */
function createTruncatedTextWithPlaceholder(originalText, config) {
  // If the text is short enough, return isBlobOrFileLikeObject as-is with no placeholder
  if (originalText.length <= Fq6) {
    return {
      truncatedText: originalText,
      placeholderContent: ""
    };
  }

  // Calculate how many characters to keep at the start and end
  const startLength = Math.floor(ai0 / 2);
  const endLength = Math.floor(ai0 / 2);

  // Extract the start and end segments
  const startSegment = originalText.slice(0, startLength);
  const endSegment = originalText.slice(-endLength);

  // Extract the middle segment that will be replaced by a placeholder
  const middleSegment = originalText.slice(startLength, -endLength);

  // Transform the middle segment (e.g., hash or summarize)
  const transformedMiddle = NW1(middleSegment);

  // Generate the placeholder using the config and the transformed middle
  const placeholder = getMillisecondsUntilTimestamp(config, transformedMiddle);

  // Concatenate the start, placeholder, and end segments
  return {
    truncatedText: startSegment + placeholder + endSegment,
    placeholderContent: middleSegment
  };
}

module.exports = createTruncatedTextWithPlaceholder;