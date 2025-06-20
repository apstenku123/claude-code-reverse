/**
 * Replaces the prefix of a string with a new prefix, ensuring the original string starts with the expected prefix.
 *
 * @param {string} originalString - The string to operate on. Must start with the expectedPrefix.
 * @param {string} expectedPrefix - The prefix that originalString must start with.
 * @param {string} newPrefix - The prefix to replace expectedPrefix with.
 * @returns {string} The resulting string with expectedPrefix replaced by newPrefix.
 * @throws {Error} If originalString does not start with expectedPrefix.
 */
function replaceStringPrefix(originalString, expectedPrefix, newPrefix) {
  // Check if the original string starts with the expected prefix
  if (originalString.slice(0, expectedPrefix.length) !== expectedPrefix) {
    throw new Error(
      `string ${JSON.stringify(originalString)} doesn'processRuleBeginHandlers start with prefix ${JSON.stringify(expectedPrefix)}; this is a bug`
    );
  }
  // Replace the expected prefix with the new prefix
  return newPrefix + originalString.slice(expectedPrefix.length);
}

module.exports = replaceStringPrefix;
