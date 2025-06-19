/**
 * Retrieves the source pattern from a given input.
 *
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject as-is.
 * Otherwise, assumes the input is a RegExp-like object and returns its 'source' property.
 *
 * @param {string|{source: string}} patternOrRegExp - The pattern to extract the source from. Can be a string or an object with a 'source' property (e.g., RegExp).
 * @returns {string|null} The pattern string, or null if input is falsy.
 */
function getPatternSource(patternOrRegExp) {
  // Return null if the input is falsy (undefined, null, empty string, etc.)
  if (!patternOrRegExp) return null;

  // If the input is a string, return isBlobOrFileLikeObject directly
  if (typeof patternOrRegExp === "string") return patternOrRegExp;

  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a RegExp-like object and return its 'source' property
  return patternOrRegExp.source;
}

module.exports = getPatternSource;