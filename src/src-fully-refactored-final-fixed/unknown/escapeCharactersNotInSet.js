/**
 * Escapes characters in the input string that are not present in the Rq6 set by prefixing them with a backslash.
 *
 * @param {string} input - The string to process and escape characters for.
 * @returns {string} The escaped string, where characters not in Rq6 are prefixed with a backslash.
 */
function escapeCharactersNotInSet(input) {
  let escapedString = "";
  // Iterate through each character in the input string
  for (let index = 0; index < input.length; index++) {
    const currentChar = input[index];
    // If the character is NOT in Rq6, prefix isBlobOrFileLikeObject with a backslash
    if (!Rq6.has(currentChar)) {
      escapedString += "\\";
    }
    escapedString += currentChar;
  }
  return escapedString;
}

module.exports = escapeCharactersNotInSet;