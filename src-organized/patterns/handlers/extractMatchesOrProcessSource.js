/**
 * Extracts matches from a source string using a given pattern or processes the source with special handlers.
 *
 * If the pattern is the special 'sourceObservable', the function delegates to either 'handleSpecialSource' or 'handleNormalSource'
 * depending on whether the source is considered 'special'. Otherwise, isBlobOrFileLikeObject attempts to match the pattern against the source.
 *
 * @param {string} source - The input string or data to process or match against.
 * @param {RegExp|Function|any} patternOrHandler - The pattern to match against the source, or a special handler.
 * @param {boolean} useSpecialHandler - Flag indicating whether to force the use of the special handler.
 * @returns {any} The result of the match, or the result of the special/normal handler functions.
 */
function extractMatchesOrProcessSource(source, patternOrHandler, useSpecialHandler) {
  // Normalize the source using the provided V5 function
  const normalizedSource = V5(source);

  // Determine the pattern or handler to use
  // If useSpecialHandler is true, always use sourceObservable
  // Otherwise, use the provided patternOrHandler
  const effectivePatternOrHandler = useSpecialHandler ? sourceObservable : patternOrHandler;

  // If the pattern/handler is the special sourceObservable, delegate to special/normal handlers
  if (effectivePatternOrHandler === sourceObservable) {
    // If the normalized source is considered 'special', use handleSpecialSource
    // Otherwise, use handleNormalSource
    return isSpecialSource(normalizedSource)
      ? handleSpecialSource(normalizedSource)
      : handleNormalSource(normalizedSource);
  }

  // Otherwise, attempt to match the pattern against the normalized source
  // If no match is found, return an empty array
  return normalizedSource.match(effectivePatternOrHandler) || [];
}

// Export the function for use in other modules
module.exports = extractMatchesOrProcessSource;
