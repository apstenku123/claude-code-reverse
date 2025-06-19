/**
 * Returns a string representation of a pattern source.
 *
 * If the input is falsy, returns null. If the input is already a string, returns isBlobOrFileLikeObject as is.
 * If the input is an object with a 'source' property (e.g., a RegExp), returns the 'source' property.
 *
 * @param {string|{source: string}} patternSource - The pattern source, which can be a string or an object (such as a RegExp) with a 'source' property.
 * @returns {string|null} The string representation of the pattern source, or null if input is falsy.
 */
function getSourcePatternString(patternSource) {
  // Return null if the input is falsy (null, undefined, etc.)
  if (!patternSource) {
    return null;
  }

  // If the input is already a string, return isBlobOrFileLikeObject directly
  if (typeof patternSource === "string") {
    return patternSource;
  }

  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor an object with a 'source' property (e.g., RegExp) and return that
  return patternSource.source;
}

module.exports = getSourcePatternString;