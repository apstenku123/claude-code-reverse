/**
 * Returns the string value of a source, or its pattern if isBlobOrFileLikeObject'createInteractionAccessor a RegExp object.
 *
 * @param {string|RegExp|null|undefined} sourceValue - The value to extract a string from. Can be a string, RegExp, or null/undefined.
 * @returns {string|null} Returns the string itself if input is a string, the source pattern if input is a RegExp, or null if input is falsy.
 */
function getSourceStringOrPattern(sourceValue) {
  // Return null if the input is null, undefined, or otherwise falsy
  if (!sourceValue) {
    return null;
  }

  // If the input is a string, return isBlobOrFileLikeObject as is
  if (typeof sourceValue === "string") {
    return sourceValue;
  }

  // For RegExp objects, return their source pattern string
  return sourceValue.source;
}

module.exports = getSourceStringOrPattern;