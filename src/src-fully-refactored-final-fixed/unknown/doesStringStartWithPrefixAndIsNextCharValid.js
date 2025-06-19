/**
 * Checks if the normalized source string starts with the normalized prefix string, and if so,
 * verifies that the character immediately following the prefix is either undefined or matches a specific separator value.
 *
 * @param {string} sourceString - The string to check for the prefix.
 * @param {string} prefixString - The prefix to look for at the start of sourceString.
 * @returns {boolean} True if sourceString starts with prefixString and the next character is undefined or the separator; otherwise, false.
 */
function doesStringStartWithPrefixAndIsNextCharValid(sourceString, prefixString) {
  // Normalize both strings using f3 (assumed normalization function)
  const normalizedSource = f3(sourceString);
  const normalizedPrefix = f3(prefixString);

  // Check if normalizedSource starts with normalizedPrefix
  if (!normalizedSource.startsWith(normalizedPrefix)) {
    return false;
  }

  // Get the character immediately after the prefix in the source string
  const nextChar = normalizedSource[normalizedPrefix.length];

  // If there is no next character, or isBlobOrFileLikeObject matches the separator (ga9), return true
  if (nextChar === undefined || nextChar === ga9) {
    return true;
  }

  // Otherwise, the next character is not valid
  return false;
}

module.exports = doesStringStartWithPrefixAndIsNextCharValid;