/**
 * Scans a string for the end of an XML declaration, starting from a given index.
 * If an XML declaration (<?xml ... ?>) is found not at the start, returns an error via createErrorObject.
 * Otherwise, returns the index after the closing '?>' or the current index if not found.
 *
 * @param {string} input - The string to scan for an XML declaration.
 * @param {number} startIndex - The index to start scanning from.
 * @returns {number|any} Returns the index after the XML declaration, or an error object if invalid XML declaration is found.
 */
function findXmlDeclarationEndIndex(input, startIndex) {
  let currentIndex = startIndex;
  // Iterate through the string starting from startIndex
  for (; currentIndex < input.length; currentIndex++) {
    // Check for either '?' or space character
    if (input[currentIndex] === '?' || input[currentIndex] === ' ') {
      // Extract substring from startIndex to currentIndex
      const substring = input.substr(startIndex, currentIndex - startIndex);
      // If 'xml' is found not at the very start, return an error
      if (currentIndex > 5 && substring === 'xml') {
        return createErrorObject(
          'InvalidXml',
          'XML declaration allowed only at the start of the document.',
          getLineAndColumnFromOffset(input, currentIndex)
        );
      } else if (
        input[currentIndex] === '?' && input[currentIndex + 1] === '>'
      ) {
        // Found the end of XML declaration
        currentIndex++;
        break;
      } else {
        // Continue scanning
        continue;
      }
    }
  }
  // Return the index after the XML declaration or the current index
  return currentIndex;
}

module.exports = findXmlDeclarationEndIndex;