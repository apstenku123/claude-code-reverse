/**
 * Checks if the input string contains any characters that are unsafe in URLs.
 * Unsafe characters include: null, tab, line feed, carriage return, space, #, %, /, :, ?, @, [, \, or ].
 *
 * @param {string} inputString - The string to check for URL-unsafe characters.
 * @returns {boolean} True if the string contains any URL-unsafe characters, false otherwise.
 */
function containsUrlUnsafeCharacters(inputString) {
  // Regular expression matches any character that is considered unsafe in URLs
  const urlUnsafeCharactersRegex = /\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|\?|@|\[|\\|\]/;
  return inputString.search(urlUnsafeCharactersRegex) !== -1;
}

module.exports = containsUrlUnsafeCharacters;