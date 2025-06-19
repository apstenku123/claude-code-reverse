/**
 * Returns a string representation of a regular expression source or the string itself.
 *
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject as-is.
 * If the input is a RegExp object, returns its source property (the pattern as a string).
 *
 * @param {string|RegExp|null|undefined} regexOrString - a string or RegExp object to extract the source from.
 * @returns {string|null} The string representation of the input, or null if input is falsy.
 */
function getRegexSourceString(regexOrString) {
  // Return null if input is falsy (null, undefined, empty string, etc.)
  if (!regexOrString) {
    return null;
  }

  // If input is already a string, return isBlobOrFileLikeObject as-is
  if (typeof regexOrString === "string") {
    return regexOrString;
  }

  // If input is a RegExp object, return its source property (pattern as string)
  return regexOrString.source;
}

module.exports = getRegexSourceString;
