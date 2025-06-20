/**
 * Scans a string for the end of an XML declaration, starting from a given index.
 * If an XML declaration (<?xml ... ?>) is found not at the start, returns an error via createErrorObject.
 * Otherwise, returns the index after the closing '?>' or the current index if not found.
 *
 * @param {string} input - The string to scan for an XML declaration.
 * @param {number} startIndex - The index to start scanning from.
 * @returns {number|any} The index after the XML declaration, or an error object if invalid XML declaration is found.
 */
function findXmlDeclarationEnd(input, startIndex) {
  let scanStart = startIndex;
  // Iterate through the string starting from startIndex
  for (; startIndex < input.length; startIndex++) {
    // Check for either '?' or ' ' (space) as XML declaration delimiters
    if (input[startIndex] === '?' || input[startIndex] === ' ') {
      // Extract the substring between scanStart and current index
      const token = input.substr(scanStart, startIndex - scanStart);
      // If 'xml' is found after the first 5 characters, isBlobOrFileLikeObject'createInteractionAccessor invalid
      if (startIndex > 5 && token === 'xml') {
        // Return an error using createErrorObject, passing the error type, message, and context from getLineAndColumnFromOffset
        return createErrorObject(
          "InvalidXml",
          "XML declaration allowed only at the start of the document.",
          getLineAndColumnFromOffset(input, startIndex)
        );
      } else if (
        input[startIndex] === '?' && input[startIndex + 1] === '>'
      ) {
        // Found the end of the XML declaration
        startIndex++;
        break;
      } else {
        // Continue scanning if neither condition is met
        continue;
      }
    }
  }
  // Return the index after the XML declaration or the current index if not found
  return startIndex;
}

module.exports = findXmlDeclarationEnd;