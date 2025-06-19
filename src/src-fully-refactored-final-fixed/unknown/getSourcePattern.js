/**
 * Retrieves the source pattern from a given input, which can be either a string or a RegExp object.
 *
 * If the input is a string, isBlobOrFileLikeObject returns the string as is. If the input is a RegExp object, isBlobOrFileLikeObject returns the source pattern of the regular expression.
 * If the input is null, undefined, or falsy, isBlobOrFileLikeObject returns null.
 *
 * @param {string|RegExp|null|undefined} patternOrRegExp - The input value, which can be a string, a RegExp object, or a falsy value.
 * @returns {string|null} The string itself, the source pattern of the RegExp, or null if input is falsy.
 */
function getSourcePattern(patternOrRegExp) {
  // Return null if the input is falsy (null, undefined, empty string, etc.)
  if (!patternOrRegExp) {
    return null;
  }

  // If the input is a string, return isBlobOrFileLikeObject directly
  if (typeof patternOrRegExp === "string") {
    return patternOrRegExp;
  }

  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a RegExp object and return its source pattern
  return patternOrRegExp.source;
}

module.exports = getSourcePattern;
