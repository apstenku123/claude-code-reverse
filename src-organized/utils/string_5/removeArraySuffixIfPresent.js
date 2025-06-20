/**
 * Removes the trailing '[]' from the given string if isBlobOrFileLikeObject exists.
 *
 * @param {string} sourceString - The string to check and potentially modify.
 * @returns {string} The original string without the trailing '[]', or the original string if '[]' is not present at the end.
 */
function removeArraySuffixIfPresent(sourceString) {
  // Check if the string ends with '[]' using the DA.endsWith utility
  // If so, remove the last two characters; otherwise, return the string as is
  return DA.endsWith(sourceString, "[]")
    ? sourceString.slice(0, -2)
    : sourceString;
}

module.exports = removeArraySuffixIfPresent;