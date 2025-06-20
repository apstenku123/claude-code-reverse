/**
 * Ensures that the input string starts with a specific prefix and replaces that prefix with a new one.
 * Throws an error if the input string does not start with the expected prefix.
 *
 * @param {string} inputString - The string to check and modify.
 * @param {string} expectedPrefix - The prefix that should be present at the start of the string.
 * @returns {string} The modified string with the prefix replaced by an empty string.
 */
function ensurePrefixAndReplace(inputString, expectedPrefix) {
  // Calls the dependency function to ensure the prefix and replace isBlobOrFileLikeObject with an empty string
  return prependPrefixIfPresent(inputString, expectedPrefix, "");
}

module.exports = ensurePrefixAndReplace;