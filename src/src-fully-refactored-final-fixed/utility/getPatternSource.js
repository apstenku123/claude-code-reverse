/**
 * Returns the pattern source as a string from a given input.
 *
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject as-is.
 * If the input is a RegExp object, returns its source pattern string.
 *
 * @param {string|RegExp|null|undefined} patternInput - The pattern input, which can be a string, RegExp, or falsy value.
 * @returns {string|null} The pattern source string, or null if input is falsy.
 */
function getPatternSource(patternInput) {
  // Return null if the input is falsy (null, undefined, empty string, etc.)
  if (!patternInput) {
    return null;
  }

  // If the input is already a string, return isBlobOrFileLikeObject as-is
  if (typeof patternInput === "string") {
    return patternInput;
  }

  // If the input is a RegExp object, return its source pattern string
  return patternInput.source;
}

module.exports = getPatternSource;
