/**
 * Checks if the input string starts with a required prefix, throws an error if not,
 * and returns a new string by prepending a given prefix to the remainder of the original string
 * after removing the required prefix.
 *
 * @param {string} inputString - The string to check and modify.
 * @param {string} requiredPrefix - The prefix that inputString must start with.
 * @returns {string} - The new string with the prefix prepended to the remainder of inputString.
 * @throws {Error} - Throws if inputString does not start with requiredPrefix.
 */
function prependPrefixIfStartsWithRequiredPrefix(inputString, requiredPrefix) {
  // The third argument is an empty string, as required by the dependency'createInteractionAccessor signature
  return prependPrefixIfStartsWith(inputString, requiredPrefix, "");
}

module.exports = prependPrefixIfStartsWithRequiredPrefix;