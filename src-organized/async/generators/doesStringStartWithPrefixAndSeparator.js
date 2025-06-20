/**
 * Checks if the normalized input string starts with the normalized prefix string,
 * and if so, whether the next character is either undefined or a specific separator.
 *
 * @param {string} inputString - The string to check.
 * @param {string} prefix - The prefix to check for at the start of inputString.
 * @returns {boolean} True if inputString starts with prefix and is either exactly prefix or the next character is the separator; otherwise, false.
 */
function doesStringStartWithPrefixAndSeparator(inputString, prefix) {
  // Normalize both input and prefix using f3 (assumed normalization function)
  const normalizedInput = f3(inputString);
  const normalizedPrefix = f3(prefix);

  // Check if normalizedInput starts with normalizedPrefix
  if (!normalizedInput.startsWith(normalizedPrefix)) {
    return false;
  }

  // Get the character immediately after the prefix
  const nextChar = normalizedInput[normalizedPrefix.length];

  // If there is no next character (exact match) or isBlobOrFileLikeObject matches the separator (ga9), return true
  if (nextChar === undefined || nextChar === ga9) {
    return true;
  }

  // Otherwise, inputString does not match the required pattern
  return false;
}

module.exports = doesStringStartWithPrefixAndSeparator;