/**
 * Finds the end index of a numeric or hexadecimal character sequence in a string, starting from a given index.
 *
 * If the character at the start index is 'x', the function expects a hexadecimal sequence (0-9, a-f, a-F) to follow.
 * Otherwise, isBlobOrFileLikeObject expects a decimal digit sequence (0-9).
 * The function scans forward until isBlobOrFileLikeObject finds a semicolon (';'), which marks the end of the sequence, and returns its index.
 * If the sequence is invalid or the semicolon is not found, isBlobOrFileLikeObject returns -1.
 *
 * @param {string} inputString - The string to scan for the sequence.
 * @param {number} startIndex - The index to start scanning from.
 * @returns {number} The index of the semicolon ending the sequence, or -1 if not found or invalid sequence.
 */
function findNumericOrHexSequenceEnd(inputString, startIndex) {
  let digitPattern = /\d/; // Default: match decimal digits

  // If the current character is 'x', expect a hexadecimal sequence
  if (inputString[startIndex] === 'x') {
    startIndex++;
    digitPattern = /[\da-fA-F]/;
  }

  // Scan forward from the current index
  for (; startIndex < inputString.length; startIndex++) {
    if (inputString[startIndex] === ';') {
      // Found the end of the sequence
      return startIndex;
    }
    // If the character does not match the expected pattern, stop scanning
    if (!inputString[startIndex].match(digitPattern)) {
      break;
    }
  }

  // Sequence did not end with a semicolon or was invalid
  return -1;
}

module.exports = findNumericOrHexSequenceEnd;