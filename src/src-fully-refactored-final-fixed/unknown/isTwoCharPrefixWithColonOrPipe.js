/**
 * Checks if the given string is exactly two characters long, the first character passes a specific validation,
 * and the second character is either a colon (:) or a pipe (|).
 *
 * @param {string} input - The string to validate.
 * @returns {boolean} True if the string matches the criteria; otherwise, false.
 */
function isTwoCharPrefixWithColonOrPipe(input) {
  // Ensure the input is exactly two characters long
  if (input.length !== 2) {
    return false;
  }

  // Validate the first character using the isAsciiAlphabetic function (assumed to be a character validator)
  const firstCharCodePoint = input.codePointAt(0);
  if (!isAsciiAlphabetic(firstCharCodePoint)) {
    return false;
  }

  // Check if the second character is either ':' or '|'
  const secondChar = input[1];
  return secondChar === ':' || secondChar === '|';
}

module.exports = isTwoCharPrefixWithColonOrPipe;