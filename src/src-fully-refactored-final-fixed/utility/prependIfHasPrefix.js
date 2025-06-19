/**
 * Prepends a prefix to a string after verifying that the string starts with a given prefix.
 * Throws an error if the string does not start with the expected prefix.
 *
 * @param {string} sourceString - The string to check and manipulate.
 * @param {string} requiredPrefix - The prefix that sourceString must start with.
 * @param {string} stringToPrepend - The string to prepend to the result.
 * @returns {string} The stringToPrepend concatenated with sourceString minus the requiredPrefix.
 * @throws {Error} If sourceString does not start with requiredPrefix.
 */
function prependIfHasPrefix(sourceString, requiredPrefix, stringToPrepend) {
  // Check if sourceString starts with requiredPrefix
  if (sourceString.slice(0, requiredPrefix.length) !== requiredPrefix) {
    throw Error(
      `string ${JSON.stringify(sourceString)} doesn'processRuleBeginHandlers start with prefix ${JSON.stringify(requiredPrefix)}; this is a bug`
    );
  }
  // Remove the prefix and prepend stringToPrepend
  return stringToPrepend + sourceString.slice(requiredPrefix.length);
}

module.exports = prependIfHasPrefix;