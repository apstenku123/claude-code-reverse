/**
 * Ensures that the input string starts with a specific prefix, then replaces that prefix with a new one.
 * Throws an error if the string does not start with the expected prefix.
 *
 * @param {string} inputString - The string to check and modify.
 * @param {string} expectedPrefix - The prefix that should be present at the start of the string.
 * @returns {string} The modified string with the prefix replaced by an empty string.
 * @throws {Error} If the input string does not start with the expected prefix.
 */
function replacePrefixIfPresent(inputString, expectedPrefix) {
  // Call the dependency function to handle prefix replacement logic
  return prependPrefixIfPresent(inputString, expectedPrefix, "");
}

module.exports = replacePrefixIfPresent;