/**
 * Removes all ASCII control characters from a string except for line feed (LF, code 10) and carriage return (CR, code 13).
 *
 * @param {string} input - The string to sanitize by removing unwanted control characters.
 * @returns {string} The sanitized string with only printable characters and LF/CR retained.
 */
function removeControlCharacters(input) {
  // Split the input string into an array of characters
  const characters = input.split("");

  // Filter out unwanted control characters
  const filteredCharacters = characters.filter((character) => {
    const charCode = character.charCodeAt(0);

    // Exclude ASCII DEL character (code 127)
    if (charCode === 127) return false;

    // For control characters (ASCII codes 0-31)
    if (charCode <= 31) {
      // Allow only LF (10) and CR (13)
      if (charCode === 10 || charCode === 13) return true;
      return false;
    }

    // Allow all other characters
    return true;
  });

  // Join the filtered characters back into a string
  return filteredCharacters.join("");
}

module.exports = removeControlCharacters;