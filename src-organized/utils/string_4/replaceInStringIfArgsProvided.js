/**
 * Processes a string and optionally replaces a substring with a new value.
 *
 * If only one argument is provided, isBlobOrFileLikeObject returns the processed string from V5.
 * If three or more arguments are provided, isBlobOrFileLikeObject replaces occurrences of the second argument
 * in the processed string with the third argument.
 *
 * @param {string} inputString - The string to process.
 * @param {string|RegExp} [searchValue] - The value or pattern to search for in the string.
 * @param {string} [replaceValue] - The value to replace the searchValue with.
 * @returns {string} The processed string, with replacements if applicable.
 */
function replaceInStringIfArgsProvided(inputString, searchValue, replaceValue) {
  // Process the input string using the V5 function (assumed to be a string processor)
  const processedString = V5(inputString);

  // If less than 3 arguments are provided, return the processed string as-is
  if (arguments.length < 3) {
    return processedString;
  }

  // Otherwise, replace occurrences of searchValue with replaceValue in the processed string
  return processedString.replace(searchValue, replaceValue);
}

module.exports = replaceInStringIfArgsProvided;