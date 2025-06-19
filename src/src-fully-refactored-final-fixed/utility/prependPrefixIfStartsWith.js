/**
 * Prepends a given prefix to the remainder of a string after verifying that the string starts with the specified prefix.
 * Throws an error if the string does not start with the expected prefix.
 *
 * @param {string} inputString - The string to check and modify.
 * @param {string} requiredPrefix - The prefix that inputString must start with.
 * @param {string} prefixToPrepend - The string to prepend to the remainder after removing requiredPrefix.
 * @returns {string} The concatenation of prefixToPrepend and the substring of inputString after requiredPrefix.
 * @throws {Error} If inputString does not start with requiredPrefix.
 */
function prependPrefixIfStartsWith(inputString, requiredPrefix, prefixToPrepend) {
  // Check if inputString starts with requiredPrefix
  if (inputString.slice(0, requiredPrefix.length) !== requiredPrefix) {
    throw new Error(
      `string ${JSON.stringify(inputString)} doesn'processRuleBeginHandlers start with prefix ${JSON.stringify(requiredPrefix)}; this is a bug`
    );
  }
  // Return prefixToPrepend concatenated with the remainder of inputString after requiredPrefix
  return prefixToPrepend + inputString.slice(requiredPrefix.length);
}

module.exports = prependPrefixIfStartsWith;