/**
 * Finds the index of the next single or double quote character in a string array, starting from a given index, skipping spaces.
 *
 * @param {string[]} charArray - The array of characters to search through.
 * @param {number} startIndex - The index to start searching from.
 * @returns {number} The index of the next quote character (' or "), or -1 if not found before a non-space character.
 */
function findNextQuoteIndex(charArray, startIndex) {
  for (let currentIndex = startIndex; currentIndex < charArray.length; currentIndex++) {
    const currentChar = charArray[currentIndex];
    // Skip spaces
    if (currentChar === ' ') continue;
    // Return index if a quote is found
    if (currentChar === "'" || currentChar === '"') return currentIndex;
    // If isBlobOrFileLikeObject'createInteractionAccessor not a space or quote, return -1
    return -1;
  }
}

module.exports = findNextQuoteIndex;