/**
 * Scans a string from a given index to find the next token boundary.
 * Handles special cases for semicolon (;) and hash (#) characters.
 *
 * @param {string} inputString - The string to scan for token boundaries.
 * @param {number} startIndex - The index to start scanning from.
 * @returns {number} - Returns the index of the next token boundary, or -1 if not found or if a special case is encountered.
 */
function findNextTokenBoundary(inputString, startIndex) {
  // Move to the next character
  startIndex++;

  // If the next character is a semicolon, return -1 (special case)
  if (inputString[startIndex] === ";") {
    return -1;
  }

  // If the next character is a hash, delegate to findEntityReferenceEndIndex(external function)
  if (inputString[startIndex] === "#") {
    startIndex++;
    return findEntityReferenceEndIndex(inputString, startIndex);
  }

  let characterCount = 0;

  // Scan until the next semicolon or until a non-word character is found (max 20 characters)
  for (; startIndex < inputString.length; startIndex++, characterCount++) {
    // If current character is a word character and limit not reached, continue
    if (inputString[startIndex].match(/\w/) && characterCount < 20) {
      continue;
    }
    // If current character is a semicolon, stop scanning
    if (inputString[startIndex] === ";") {
      break;
    }
    // If a non-word character is found before semicolon, return -1
    return -1;
  }

  // Return the index of the token boundary
  return startIndex;
}

module.exports = findNextTokenBoundary;