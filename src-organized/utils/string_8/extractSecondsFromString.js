/**
 * Extracts a number of seconds from a string using the $Y6 regular expression and returns the value in milliseconds.
 * If no match is found, returns null.
 *
 * @param {string} inputString - The string to extract the seconds value from.
 * @returns {number|null} The extracted seconds value converted to milliseconds, or null if not found.
 */
function extractSecondsFromString(inputString) {
  // Attempt to match the input string against the $Y6 regular expression
  const matchResult = inputString.toString().match($Y6);

  // If a match is found, parse the captured group as an integer and convert to milliseconds
  if (matchResult) {
    const seconds = parseInt(matchResult[1], 10);
    return seconds * 1000;
  }

  // Return null if no match is found
  return null;
}

module.exports = extractSecondsFromString;