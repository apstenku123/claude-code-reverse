/**
 * Prepends a given prefix to the remainder of a string after verifying the string starts with that prefix.
 * Throws an error if the string does not start with the specified prefix.
 *
 * @param {string} inputString - The string to check and modify.
 * @param {string} requiredPrefix - The prefix that inputString must start with.
 * @param {string} prefixToPrepend - The string to prepend to the remainder after removing the prefix.
 * @returns {string} The new string formed by prefixToPrepend + (inputString without requiredPrefix at the start).
 * @throws {Error} If inputString does not start with requiredPrefix.
 */
function prependPrefixIfMatches(inputString, requiredPrefix, prefixToPrepend) {
  // Check if inputString starts with requiredPrefix
  if (inputString.slice(0, requiredPrefix.length) !== requiredPrefix) {
    throw new Error(
      `string ${JSON.stringify(inputString)} doesn'processRuleBeginHandlers start with prefix ${JSON.stringify(requiredPrefix)}; this is a bug`
    );
  }
  // Remove the requiredPrefix from inputString and prepend prefixToPrepend
  return prefixToPrepend + inputString.slice(requiredPrefix.length);
}

module.exports = prependPrefixIfMatches;