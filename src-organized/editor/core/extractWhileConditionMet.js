/**
 * Extracts and concatenates characters from the input array while a predicate function returns true.
 *
 * @param {function(char: string): boolean} predicate - Function to test each character; extraction continues while this returns true.
 * @param {string[]} charArray - Array of characters to extract from.
 * @param {{ position: number }} cursor - Object tracking the current position in the array (will be mutated).
 * @returns {string} Concatenated string of extracted characters.
 */
function extractWhileConditionMet(predicate, charArray, cursor) {
  let extractedString = "";
  // Continue extracting while within bounds and predicate returns true
  while (cursor.position < charArray.length && predicate(charArray[cursor.position])) {
    extractedString += charArray[cursor.position];
    cursor.position++;
  }
  return extractedString;
}

module.exports = extractWhileConditionMet;