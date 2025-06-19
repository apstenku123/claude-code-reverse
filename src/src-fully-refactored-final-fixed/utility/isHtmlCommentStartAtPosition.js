/**
 * Checks if the given string contains the start of an HTML comment ("<!--") at the specified index.
 *
 * @param {string} inputString - The string to check for the HTML comment start sequence.
 * @param {number} position - The index in the string to check for the start of the comment sequence.
 * @returns {boolean} True if the substring at the specified position is the start of an HTML comment ("<!--"), otherwise false.
 */
function isHtmlCommentStartAtPosition(inputString, position) {
  // Check if the substring starting at position+1 matches "!--"
  // This checks for the sequence: inputString[position+1] === '!',
  // inputString[position+2] === '-', inputString[position+3] === '-'
  if (
    inputString[position + 1] === '!' &&
    inputString[position + 2] === '-' &&
    inputString[position + 3] === '-'
  ) {
    return true;
  }
  return false;
}

module.exports = isHtmlCommentStartAtPosition;