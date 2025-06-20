/**
 * Generates a bitmask map for each unique character in the input string.
 * Each character is mapped to a bitmask integer where each bit represents
 * the presence of the character at a specific position in the string.
 *
 * For example, for input 'abcab', the result is:
 * {
 *   a: 0b10001 (17), // 'a' at positions 0 and 3
 *   b: 0b00010 (2),  // 'b' at position 1
 *   c: 0b00100 (4)   // 'c' at position 2
 * }
 *
 * @param {string} inputString - The string to analyze for character positions.
 * @returns {Object.<string, number>} An object mapping each character to its bitmask.
 */
function getCharacterBitmaskMap(inputString) {
  const characterBitmaskMap = {};
  const stringLength = inputString.length;

  for (let position = 0; position < stringLength; position += 1) {
    const character = inputString.charAt(position);
    // Calculate the bitmask for this position (1 shifted left by (stringLength - position - 1))
    const bitmask = 1 << (stringLength - position - 1);
    // Combine with any existing bitmask for this character using bitwise OR
    characterBitmaskMap[character] = (characterBitmaskMap[character] || 0) | bitmask;
  }

  return characterBitmaskMap;
}

module.exports = getCharacterBitmaskMap;