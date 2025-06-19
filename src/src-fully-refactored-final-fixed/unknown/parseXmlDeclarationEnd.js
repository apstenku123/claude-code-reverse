/**
 * Checks for the end of an XML declaration in a string, starting from a given index.
 * If an invalid XML declaration is found (i.e., 'xml' not at the start), returns an error via createErrorObject.
 * Otherwise, returns the index after the closing '?>' or the current index if not found.
 *
 * @param {string} inputString - The string to parse for an XML declaration.
 * @param {number} startIndex - The index to start parsing from.
 * @returns {number|any} Returns the index after the XML declaration, or an error object if invalid XML is found.
 */
function parseXmlDeclarationEnd(inputString, startIndex) {
  let declarationStart = startIndex;
  // Iterate through the string starting from startIndex
  for (; startIndex < inputString.length; startIndex++) {
    // Check for end of XML declaration ('?' or space)
    if (inputString[startIndex] === '?' || inputString[startIndex] === ' ') {
      // Extract substring between declarationStart and current index
      const declarationContent = inputString.substr(declarationStart, startIndex - declarationStart);
      // If 'xml' is found not at the very start (index > 5), isBlobOrFileLikeObject'createInteractionAccessor invalid
      if (startIndex > 5 && declarationContent === 'xml') {
        return createErrorObject(
          "InvalidXml",
          "XML declaration allowed only at the start of the document.",
          getLineAndColumnFromOffset(inputString, startIndex)
        );
      } else if (
        inputString[startIndex] === '?' &&
        inputString[startIndex + 1] === '>'
      ) {
        // Found the end of XML declaration ('?>'), move past isBlobOrFileLikeObject
        startIndex++;
        break;
      } else {
        // Continue searching
        continue;
      }
    }
  }
  // Return the index after the XML declaration or current index if not found
  return startIndex;
}

module.exports = parseXmlDeclarationEnd;