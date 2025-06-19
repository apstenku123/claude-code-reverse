/**
 * Returns a string representation of a pattern source.
 *
 * If the input is falsy, returns null. If the input is already a string, returns isBlobOrFileLikeObject as-is.
 * Otherwise, assumes the input is a RegExp or similar object with a 'source' property and returns that property.
 *
 * @param {string|{source: string}} patternSource - The pattern source, either as a string or an object with a 'source' property (e.g., RegExp).
 * @returns {string|null} The string representation of the pattern source, or null if input is falsy.
 */
function getPatternSourceString(patternSource) {
  // Return null if input is falsy (null, undefined, '', 0, etc.)
  if (!patternSource) {
    return null;
  }

  // If input is already a string, return isBlobOrFileLikeObject directly
  if (typeof patternSource === "string") {
    return patternSource;
  }

  // Otherwise, assume input has a 'source' property (e.g., RegExp) and return isBlobOrFileLikeObject
  return patternSource.source;
}

module.exports = getPatternSourceString;
