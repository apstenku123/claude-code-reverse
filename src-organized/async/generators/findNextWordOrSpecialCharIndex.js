/**
 * Scans a string from a given index, looking for the next word character, semicolon, or hash.
 * Returns the index of the next semicolon or the result of a special handler if a hash is found.
 * If a semicolon is found immediately, returns -1. If a hash is found, delegates to findEntityReferenceEndIndex.
 * Otherwise, advances up to 20 word characters, stopping at a non-word character or semicolon.
 *
 * @param {string} inputString - The string to scan.
 * @param {number} startIndex - The index to start scanning from.
 * @returns {number} The index of the next semicolon, -1 if not found, or the result of findEntityReferenceEndIndex if a hash is encountered.
 */
function findNextWordOrSpecialCharIndex(inputString, startIndex) {
  // Move to the next character
  startIndex++;

  // If the next character is a semicolon, return -1
  if (inputString[startIndex] === ";") {
    return -1;
  }

  // If the next character is a hash, delegate to findEntityReferenceEndIndex
  if (inputString[startIndex] === "#") {
    startIndex++;
    return findEntityReferenceEndIndex(inputString, startIndex);
  }

  // Scan up to 20 word characters
  let wordCharCount = 0;
  for (; startIndex < inputString.length; startIndex++, wordCharCount++) {
    // Continue if current character is a word character and limit not reached
    if (inputString[startIndex].match(/\w/) && wordCharCount < 20) {
      continue;
    }
    // Stop if a semicolon is found
    if (inputString[startIndex] === ";") {
      break;
    }
    // If a non-word character (not semicolon) is found, return -1
    return -1;
  }

  // Return the current index (either at semicolon or end of scan)
  return startIndex;
}

module.exports = findNextWordOrSpecialCharIndex;