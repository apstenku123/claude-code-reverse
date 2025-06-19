/**
 * Checks if the input string is enclosed in matching single or double quotes.
 *
 * @param {string} inputString - The string to check for enclosing quotes.
 * @returns {boolean} True if the string starts and ends with the same type of quote (single or double), false otherwise.
 */
function isStringEnclosedInMatchingQuotes(inputString) {
  // Check if the string is at least 2 characters long
  if (typeof inputString !== 'string' || inputString.length < 2) {
    return false;
  }

  const firstChar = inputString[0];
  const lastChar = inputString[inputString.length - 1];

  // Check for matching double quotes or matching single quotes
  const isDoubleQuoted = firstChar === '"' && lastChar === '"';
  const isSingleQuoted = firstChar === "'" && lastChar === "'";

  return isDoubleQuoted || isSingleQuoted;
}

module.exports = isStringEnclosedInMatchingQuotes;