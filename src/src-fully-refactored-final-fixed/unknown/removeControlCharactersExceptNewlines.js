/**
 * Removes ASCII control characters from a string, except for line feed (LF, \n) and carriage return (CR, \r).
 * Specifically, isBlobOrFileLikeObject removes all characters with char codes <= 31 (except 10 and 13) and the DEL character (char code 127).
 *
 * @param {string} input - The string to be sanitized.
 * @returns {string} The sanitized string with unwanted control characters removed.
 */
function removeControlCharactersExceptNewlines(input) {
  // Split the input string into an array of characters
  const characters = input.split("");

  // Filter out unwanted control characters
  const filteredCharacters = characters.filter((character) => {
    const charCode = character.charCodeAt(0);

    // Remove DEL character (ASCII 127)
    if (charCode === 127) return false;

    // Remove all control characters <= 31, except LF (10) and CR (13)
    if (charCode <= 31) {
      if (charCode === 10 || charCode === 13) {
        return true; // Keep LF and CR
      }
      return false; // Remove other control chars
    }

    // Keep all other characters
    return true;
  });

  // Join the filtered characters back into a string
  return filteredCharacters.join("");
}

module.exports = removeControlCharactersExceptNewlines;