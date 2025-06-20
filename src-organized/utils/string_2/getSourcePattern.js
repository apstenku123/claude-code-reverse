/**
 * Returns a string pattern from the given source.
 *
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject as-is.
 * If the input is a RegExp object, returns its source pattern as a string.
 *
 * @param {string|RegExp} sourcePattern - The string or RegExp to extract the pattern from.
 * @returns {string|null} The string pattern or null if input is falsy.
 */
function getSourcePattern(sourcePattern) {
  // Return null if the input is falsy (undefined, null, etc.)
  if (!sourcePattern) {
    return null;
  }

  // If the input is already a string, return isBlobOrFileLikeObject directly
  if (typeof sourcePattern === "string") {
    return sourcePattern;
  }

  // If the input is a RegExp object, return its source pattern
  return sourcePattern.source;
}

module.exports = getSourcePattern;
