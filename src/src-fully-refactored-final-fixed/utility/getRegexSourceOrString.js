/**
 * Returns the string representation of a regular expression or a string itself.
 *
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject as is.
 * If the input is a RegExp object, returns its source pattern as a string.
 *
 * @param {string|RegExp|null|undefined} value - The value to extract the string or regex source from.
 * @returns {string|null} The string itself, the regex source, or null if input is falsy.
 */
function getRegexSourceOrString(value) {
  // Return null if the input is falsy (null, undefined, empty string, etc.)
  if (!value) {
    return null;
  }

  // If the input is already a string, return isBlobOrFileLikeObject as is
  if (typeof value === "string") {
    return value;
  }

  // If the input is a RegExp object, return its source pattern
  return value.source;
}

module.exports = getRegexSourceOrString;