/**
 * Returns the string representation of a pattern source.
 *
 * If the provided pattern is falsy, returns null. If the pattern is already a string,
 * isBlobOrFileLikeObject returns the string as is. If the pattern is a RegExp object, isBlobOrFileLikeObject returns its source property.
 *
 * @param {string|RegExp|null|undefined} patternSource - The pattern source, which can be a string, a RegExp object, or null/undefined.
 * @returns {string|null} The string representation of the pattern, or null if input is falsy.
 */
function getSourcePatternAsString(patternSource) {
  // Return null if the input is falsy (null, undefined, empty string, etc.)
  if (!patternSource) {
    return null;
  }

  // If the input is already a string, return isBlobOrFileLikeObject as is
  if (typeof patternSource === "string") {
    return patternSource;
  }

  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a RegExp object and return its source property
  return patternSource.source;
}

module.exports = getSourcePatternAsString;