/**
 * Replaces the prefix of a given string with an empty string.
 *
 * This function utilizes the replaceStringPrefix utility to remove the specified prefix from the target string.
 * If the target string does not start with the given prefix, an error is thrown.
 *
 * @param {string} targetString - The string whose prefix will be replaced.
 * @param {string} prefixToReplace - The prefix to look for and remove from the target string.
 * @returns {string} The resulting string after the prefix has been removed.
 */
function replaceStringPrefixWithEmpty(targetString, prefixToReplace) {
  // Call replaceStringPrefix with an empty string as the new prefix
  return replaceStringPrefix(targetString, prefixToReplace, "");
}

module.exports = replaceStringPrefixWithEmpty;