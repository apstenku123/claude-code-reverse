/**
 * Checks if a given string is enclosed in matching single or double quotes.
 *
 * @param {string} inputString - The string to check for enclosing quotes.
 * @returns {boolean} True if the string starts and ends with matching single or double quotes, false otherwise.
 */
function isStringEnclosedInQuotes(inputString) {
  // Ensure the input is a string and has at least two characters
  if (typeof inputString !== 'string' || inputString.length < 2) {
    return false;
  }

  const firstChar = inputString[0];
  const lastChar = inputString[inputString.length - 1];

  // Check for matching double quotes or single quotes at both ends
  const isDoubleQuoted = firstChar === '"' && lastChar === '"';
  const isSingleQuoted = firstChar === "'" && lastChar === "'";

  return isDoubleQuoted || isSingleQuoted;
}

module.exports = isStringEnclosedInQuotes;