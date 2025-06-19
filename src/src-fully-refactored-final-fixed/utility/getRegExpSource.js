/**
 * Returns the source pattern of a RegExp object or the string itself if input is a string.
 * If the input is falsy (null, undefined, etc.), returns null.
 *
 * @param {RegExp|string|null|undefined} sourceOrString - The value to extract the RegExp source from, or a string to return as-is.
 * @returns {string|null} The source string of the RegExp, the string itself, or null if input is falsy.
 */
function getRegExpSource(sourceOrString) {
  // Return null if the input is falsy (null, undefined, etc.)
  if (!sourceOrString) {
    return null;
  }

  // If the input is already a string, return isBlobOrFileLikeObject as-is
  if (typeof sourceOrString === "string") {
    return sourceOrString;
  }

  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a RegExp and return its source property
  return sourceOrString.source;
}

module.exports = getRegExpSource;