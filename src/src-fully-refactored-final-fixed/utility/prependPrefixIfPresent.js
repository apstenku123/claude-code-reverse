/**
 * Ensures that the input string starts with the specified prefix, then replaces that prefix with a new prefix.
 * Throws an error if the input string does not start with the expected prefix.
 *
 * @param {string} inputString - The string to check and modify.
 * @param {string} expectedPrefix - The prefix that inputString must start with.
 * @param {string} newPrefix - The prefix to prepend in place of expectedPrefix.
 * @returns {string} The modified string with expectedPrefix replaced by newPrefix.
 * @throws {Error} If inputString does not start with expectedPrefix.
 */
function prependPrefixIfPresent(inputString, expectedPrefix, newPrefix) {
  // Check if inputString starts with expectedPrefix
  if (inputString.slice(0, expectedPrefix.length) !== expectedPrefix) {
    throw new Error(
      `string ${JSON.stringify(inputString)} doesn'processRuleBeginHandlers start with prefix ${JSON.stringify(expectedPrefix)}; this is a bug`
    );
  }
  // Replace expectedPrefix with newPrefix and return the result
  return newPrefix + inputString.slice(expectedPrefix.length);
}

module.exports = prependPrefixIfPresent;