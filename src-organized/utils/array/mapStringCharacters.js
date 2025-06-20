/**
 * Applies a mapping function to each character in the input string and returns the resulting string.
 *
 * @param {function(string, number, string[]): string} mapFunction - The function to apply to each character. Receives the character, its index, and the array of characters.
 * @param {string} inputString - The string whose characters will be mapped.
 * @returns {string} The resulting string after mapping each character.
 */
function mapStringCharacters(mapFunction, inputString) {
  // Split the input string into an array of characters
  const charactersArray = inputString.split("");
  // Apply the mapping function to each character
  const mappedCharacters = charactersArray.map(mapFunction);
  // Join the mapped characters back into a string
  return mappedCharacters.join("");
}

module.exports = mapStringCharacters;