/**
 * Removes enclosing single or double quotes from a string, if present.
 *
 * @param {string} inputString - The string to process, potentially wrapped in single or double quotes.
 * @returns {string} The input string without enclosing quotes, or the original string if no enclosing quotes are found.
 */
function removeEnclosingQuotes(inputString) {
  // Check if the string starts and ends with matching double or single quotes
  const hasDoubleQuotes = inputString.startsWith('"') && inputString.endsWith('"');
  const hasSingleQuotes = inputString.startsWith("'") && inputString.endsWith("'");

  if (hasDoubleQuotes || hasSingleQuotes) {
    // Remove the first and last character (the quotes)
    return inputString.slice(1, -1);
  }

  // Return the original string if no enclosing quotes are found
  return inputString;
}

module.exports = removeEnclosingQuotes;
