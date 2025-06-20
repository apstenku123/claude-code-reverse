/**
 * Generates a bitmask map for each unique character in the input string.
 * Each character is mapped to a bitmask where each bit represents the character'createInteractionAccessor
 * occurrence at a specific position in the string (from left to right).
 *
 * For example, for input 'abcab', the result will be:
 * {
 *   a: 0b10010, // a appears at positions 0 and 3
 *   b: 0b01001, // b appears at positions 1 and 4
 *   c: 0b00100  // c appears at position 2
 * }
 *
 * @param {string} inputString - The string to analyze for character positions.
 * @returns {Object.<string, number>} An object mapping each character to its bitmask of positions.
 */
function getCharBitmaskMap(inputString) {
  const charBitmaskMap = {};
  const stringLength = inputString.length;

  for (let position = 0; position < stringLength; position += 1) {
    const currentChar = inputString.charAt(position);
    // Calculate the bitmask for this position (1 shifted left by (length - position - 1))
    const positionBit = 1 << (stringLength - position - 1);
    // Combine with any existing bitmask for this character using bitwise OR
    charBitmaskMap[currentChar] = (charBitmaskMap[currentChar] || 0) | positionBit;
  }

  return charBitmaskMap;
}

module.exports = getCharBitmaskMap;