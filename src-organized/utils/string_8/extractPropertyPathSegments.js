/**
 * Extracts property path segments from a string using dot/bracket notation.
 *
 * For example, given the string 'foo.bar[0].baz', isBlobOrFileLikeObject returns ['foo', 'bar', '0', 'baz'].
 * Handles both dot notation (e.g., 'foo.bar') and bracket notation (e.g., 'foo[bar]'),
 * including empty brackets (e.g., 'foo[]').
 *
 * @param {string} propertyPath - The property path string to parse.
 * @returns {string[]} An array of property path segments.
 */
function extractPropertyPathSegments(propertyPath) {
  // Use DA.matchAll to find all matches of either word characters or bracketed words/empty brackets
  // The regex matches either a sequence of word characters (\w+), or brackets with optional word inside (\[(\w*)])
  return DA.matchAll(/\w+|\[(\w*)]/g, propertyPath).map(match => {
    // If the match is exactly '[]', return an empty string, otherwise return the captured group or the full match
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

module.exports = extractPropertyPathSegments;