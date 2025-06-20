/**
 * Processes a string using the V5 function and optionally performs a replacement.
 *
 * If only one argument is provided, returns the result of V5(inputString).
 * If three or more arguments are provided, replaces occurrences of the pattern in the processed string with the replacement value.
 *
 * @param {string} inputString - The string to process and potentially modify.
 * @param {RegExp|string} [pattern] - The pattern to search for in the processed string (optional).
 * @param {string} [replacement] - The value to replace the pattern with (optional).
 * @returns {string} The processed string, with replacements if applicable.
 */
function replaceInStringOrReturnOriginal(inputString, pattern, replacement) {
  // Process the input string using the V5 function
  const processedString = V5(inputString);

  // If less than 3 arguments, return the processed string as-is
  if (arguments.length < 3) {
    return processedString;
  }

  // Otherwise, perform the replacement using the provided pattern and replacement
  return processedString.replace(pattern, replacement);
}

module.exports = replaceInStringOrReturnOriginal;