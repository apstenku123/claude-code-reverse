/**
 * Ensures that the input string starts with the specified prefix and, if so, replaces the prefix with a new one.
 * Throws an error if the input string does not start with the expected prefix.
 *
 * @param {string} inputString - The string to check and modify.
 * @param {string} expectedPrefix - The prefix that inputString must start with.
 * @param {string} newPrefix - The prefix to prepend to the result after removing expectedPrefix.
 * @returns {string} The modified string with expectedPrefix replaced by newPrefix.
 * @throws {Error} If inputString does not start with expectedPrefix.
 */
function prependPrefixIfValid(inputString, expectedPrefix, newPrefix) {
  // Check if inputString starts with expectedPrefix
  if (inputString.slice(0, expectedPrefix.length) !== expectedPrefix) {
    throw new Error(
      `string ${JSON.stringify(inputString)} doesn'processRuleBeginHandlers start with prefix ${JSON.stringify(expectedPrefix)}; this is a bug`
    );
  }
  // Remove the expectedPrefix and prepend newPrefix
  return newPrefix + inputString.slice(expectedPrefix.length);
}

module.exports = prependPrefixIfValid;