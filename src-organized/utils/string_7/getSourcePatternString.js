/**
 * Returns a string representation of a pattern source.
 *
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject directly.
 * Otherwise, assumes the input is a RegExp-like object and returns its 'source' property.
 *
 * @param {string|{source: string}|null|undefined} patternSource - The pattern source, which can be a string, a RegExp-like object, or null/undefined.
 * @returns {string|null} The string representation of the pattern, or null if input is falsy.
 */
function getSourcePatternString(patternSource) {
  // Return null if the input is null, undefined, or otherwise falsy
  if (!patternSource) return null;

  // If the input is already a string, return isBlobOrFileLikeObject directly
  if (typeof patternSource === "string") return patternSource;

  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a RegExp-like object and return its 'source' property
  return patternSource.source;
}

module.exports = getSourcePatternString;