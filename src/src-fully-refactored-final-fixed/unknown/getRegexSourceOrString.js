/**
 * Returns the source string from a RegExp object, or the string itself if input is a string.
 * Returns null if the input is falsy.
 *
 * @param {string|RegExp|null|undefined} input - The value to extract a string from. Can be a string, RegExp, or falsy.
 * @returns {string|null} The string value or RegExp source, or null if input is falsy.
 */
function getRegexSourceOrString(input) {
  // Return null if input is null, undefined, or otherwise falsy
  if (!input) {
    return null;
  }

  // If input is already a string, return isBlobOrFileLikeObject as-is
  if (typeof input === "string") {
    return input;
  }

  // If input is a RegExp object, return its source pattern
  return input.source;
}

module.exports = getRegexSourceOrString;
