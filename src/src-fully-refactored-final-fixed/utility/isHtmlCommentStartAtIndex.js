/**
 * Checks if the given string contains the start of an HTML comment ("<!--") at the specified index + 1.
 *
 * @param {string} inputString - The string to check for the HTML comment start sequence.
 * @param {number} currentIndex - The index in the string to check from. The function checks at currentIndex + 1.
 * @returns {boolean} True if the substring at inputString[currentIndex + 1] is "!", inputString[currentIndex + 2] is "-", and inputString[currentIndex + 3] is "-" (i.e., the sequence "!--"), otherwise false.
 */
function isHtmlCommentStartAtIndex(inputString, currentIndex) {
  // Check if the substring starting at currentIndex + 1 matches the HTML comment start sequence "!--"
  const isCommentStart =
    inputString[currentIndex + 1] === '!' &&
    inputString[currentIndex + 2] === '-' &&
    inputString[currentIndex + 3] === '-';
  return isCommentStart;
}

module.exports = isHtmlCommentStartAtIndex;