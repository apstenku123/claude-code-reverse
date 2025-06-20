/**
 * Checks if the given string contains the start of an HTML comment ("<!--") at the specified index.
 *
 * @param {string} inputString - The string to check for the HTML comment start sequence.
 * @param {number} position - The index in the string to check for the start of the comment.
 * @returns {boolean} True if the substring at the given position is the start of an HTML comment, otherwise false.
 */
function isHtmlCommentStart(inputString, position) {
  // Check if the substring starting at position+1 matches the HTML comment start sequence "!--"
  const isCommentStart =
    inputString[position + 1] === '!' &&
    inputString[position + 2] === '-' &&
    inputString[position + 3] === '-';
  return isCommentStart;
}

module.exports = isHtmlCommentStart;