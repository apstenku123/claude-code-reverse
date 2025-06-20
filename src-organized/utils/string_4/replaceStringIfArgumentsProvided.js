/**
 * Replaces a substring in the input string if replacement arguments are provided.
 *
 * If only one argument is provided, returns the string as-is (after processing with V5).
 * If three or more arguments are provided, replaces the substring (pattern) in the string with the replacement value.
 *
 * @param {string} inputString - The string to process or perform replacement on.
 * @param {string|RegExp} [pattern] - The substring or regular expression pattern to search for (optional).
 * @param {string} [replacement] - The string to replace the matched pattern with (optional).
 * @returns {string} The processed string, either unchanged or with replacements applied.
 */
function replaceStringIfArgumentsProvided(inputString, pattern, replacement) {
  // Process the input string using V5 (assumed to be a string utility function)
  const processedString = V5(inputString);

  // If fewer than 3 arguments are provided, return the processed string as-is
  if (arguments.length < 3) {
    return processedString;
  }

  // Otherwise, perform the replacement using the provided pattern and replacement
  return processedString.replace(pattern, replacement);
}

module.exports = replaceStringIfArgumentsProvided;