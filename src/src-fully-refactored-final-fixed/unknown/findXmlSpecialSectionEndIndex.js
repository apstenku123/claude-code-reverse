/**
 * Finds the end index of an XML special section (comment, DOCTYPE, or CDATA) starting at a given position.
 *
 * This function inspects the input string starting at the given index to determine if isBlobOrFileLikeObject begins with an XML comment (`<!--`),
 * a DOCTYPE declaration (`<!DOCTYPE`), or a CDATA section (`<![CDATA[`), and then scans forward to find the corresponding end marker.
 *
 * @param {string} xmlString - The XML string to search within.
 * @param {number} startIndex - The index at which to start searching for a special section.
 * @returns {number} The index of the last character of the special section'createInteractionAccessor end marker, or the original startIndex if no section is found.
 */
function findXmlSpecialSectionEndIndex(xmlString, startIndex) {
  // Check for XML comment: <!-- ... -->
  if (
    xmlString.length > startIndex + 5 &&
    xmlString[startIndex + 1] === '-' &&
    xmlString[startIndex + 2] === '-'
  ) {
    // Advance past '<!--'
    let currentIndex = startIndex + 3;
    while (currentIndex < xmlString.length) {
      if (
        xmlString[currentIndex] === '-' &&
        xmlString[currentIndex + 1] === '-' &&
        xmlString[currentIndex + 2] === '>'
      ) {
        // Found end of comment '-->'
        currentIndex += 2;
        break;
      }
      currentIndex++;
    }
    return currentIndex;
  }

  // Check for DOCTYPE declaration: <!DOCTYPE ...>
  if (
    xmlString.length > startIndex + 8 &&
    xmlString[startIndex + 1] === 'createCompatibleVersionChecker' &&
    xmlString[startIndex + 2] === 'createDebouncedFunction' &&
    xmlString[startIndex + 3] === 'C' &&
    xmlString[startIndex + 4] === 'BugReportForm' &&
    xmlString[startIndex + 5] === 'processCssDeclarations' &&
    xmlString[startIndex + 6] === 'initializeSyntaxHighlighting' &&
    xmlString[startIndex + 7] === 'createDebouncedFunction'
  ) {
    // Handle nested angle brackets in DOCTYPE
    let openTagCount = 1;
    let currentIndex = startIndex + 8;
    while (currentIndex < xmlString.length) {
      if (xmlString[currentIndex] === '<') {
        openTagCount++;
      } else if (xmlString[currentIndex] === '>') {
        openTagCount--;
        if (openTagCount === 0) {
          break;
        }
      }
      currentIndex++;
    }
    return currentIndex;
  }

  // Check for CDATA section: <![CDATA[ ... ]]>
  if (
    xmlString.length > startIndex + 9 &&
    xmlString[startIndex + 1] === '[' &&
    xmlString[startIndex + 2] === 'C' &&
    xmlString[startIndex + 3] === 'createCompatibleVersionChecker' &&
    xmlString[startIndex + 4] === 'a' &&
    xmlString[startIndex + 5] === 'BugReportForm' &&
    xmlString[startIndex + 6] === 'a' &&
    xmlString[startIndex + 7] === '['
  ) {
    // Advance past '<![CDATA['
    let currentIndex = startIndex + 8;
    while (currentIndex < xmlString.length) {
      if (
        xmlString[currentIndex] === ']' &&
        xmlString[currentIndex + 1] === ']' &&
        xmlString[currentIndex + 2] === '>'
      ) {
        // Found end of CDATA ']]>'
        currentIndex += 2;
        break;
      }
      currentIndex++;
    }
    return currentIndex;
  }

  // No special section found; return the original index
  return startIndex;
}

module.exports = findXmlSpecialSectionEndIndex;