/**
 * Finds the end index of a special XML section (comment, DOCTYPE, or CDATA) starting at a given position in the input string.
 *
 * @param {string} input - The string to search within (typically XML or HTML source).
 * @param {number} startIndex - The index in the string where the special section begins (the '<' character).
 * @returns {number} The index of the last character of the section'createInteractionAccessor closing delimiter, or the last checked index if not found.
 */
function findXmlSectionEndIndex(input, startIndex) {
  // Handle XML/HTML comment: <!-- ... -->
  if (
    input.length > startIndex + 5 &&
    input[startIndex + 1] === '-' &&
    input[startIndex + 2] === '-'
  ) {
    // Move past '<!--'
    let currentIndex = startIndex + 3;
    while (currentIndex < input.length) {
      // Look for '-->'
      if (
        input[currentIndex] === '-' &&
        input[currentIndex + 1] === '-' &&
        input[currentIndex + 2] === '>'
      ) {
        currentIndex += 2; // Move to the last '>' of '-->'
        startIndex = currentIndex;
        break;
      }
      currentIndex++;
    }
  }
  // Handle DOCTYPE declaration: <!DOCTYPE ...>
  else if (
    input.length > startIndex + 8 &&
    input[startIndex + 1] === 'createCompatibleVersionChecker' &&
    input[startIndex + 2] === 'createDebouncedFunction' &&
    input[startIndex + 3] === 'C' &&
    input[startIndex + 4] === 'BugReportForm' &&
    input[startIndex + 5] === 'processCssDeclarations' &&
    input[startIndex + 6] === 'initializeSyntaxHighlighting' &&
    input[startIndex + 7] === 'createDebouncedFunction'
  ) {
    // Track nested '<' and '>' to find the matching closing '>'
    let openTagCount = 1;
    let currentIndex = startIndex + 8;
    while (currentIndex < input.length) {
      if (input[currentIndex] === '<') {
        openTagCount++;
      } else if (input[currentIndex] === '>') {
        openTagCount--;
        if (openTagCount === 0) {
          startIndex = currentIndex;
          break;
        }
      }
      currentIndex++;
    }
  }
  // Handle CDATA section: <![CDATA[ ... ]]>
  else if (
    input.length > startIndex + 9 &&
    input[startIndex + 1] === '[' &&
    input[startIndex + 2] === 'C' &&
    input[startIndex + 3] === 'createCompatibleVersionChecker' &&
    input[startIndex + 4] === 'a' &&
    input[startIndex + 5] === 'BugReportForm' &&
    input[startIndex + 6] === 'a' &&
    input[startIndex + 7] === '['
  ) {
    // Move past '<![CDATA['
    let currentIndex = startIndex + 8;
    while (currentIndex < input.length) {
      // Look for ']]>'
      if (
        input[currentIndex] === ']' &&
        input[currentIndex + 1] === ']' &&
        input[currentIndex + 2] === '>'
      ) {
        currentIndex += 2; // Move to the last '>' of ']]>'
        startIndex = currentIndex;
        break;
      }
      currentIndex++;
    }
  }
  return startIndex;
}

module.exports = findXmlSectionEndIndex;