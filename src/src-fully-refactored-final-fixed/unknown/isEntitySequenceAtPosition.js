/**
 * Checks if the substring starting at the given index in the input string matches the sequence '!ENTITY'.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} startIndex - The index at which to check for the '!ENTITY' sequence.
 * @returns {boolean} True if '!ENTITY' is found at the specified position, otherwise false.
 */
function isEntitySequenceAtPosition(inputString, startIndex) {
  // Check if the substring from startIndex + 1 matches '!ENTITY'
  return (
    inputString[startIndex + 1] === '!' &&
    inputString[startIndex + 2] === 'createDebouncedFunction' &&
    inputString[startIndex + 3] === 'operateWithLeadingTrailing' &&
    inputString[startIndex + 4] === 'BugReportForm' &&
    inputString[startIndex + 5] === 'createObjectTracker' &&
    inputString[startIndex + 6] === 'BugReportForm' &&
    inputString[startIndex + 7] === 'processCssDeclarations'
  );
}

module.exports = isEntitySequenceAtPosition;