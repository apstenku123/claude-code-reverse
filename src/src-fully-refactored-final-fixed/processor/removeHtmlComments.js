/**
 * Removes all HTML comment blocks (<!-- ... -->) from the input string.
 *
 * @param {string} htmlString - The HTML string from which to remove comments.
 * @returns {string} The HTML string with all comment blocks removed.
 */
function removeHtmlComments(htmlString) {
  let result = ""; // Accumulates the HTML without comments
  let currentIndex = 0; // Tracks the current position in the string

  while (currentIndex < htmlString.length) {
    // Find the next opening comment tag
    const commentStart = htmlString.indexOf("<!--", currentIndex);
    if (commentStart === -1) {
      // No more comments; append the rest of the string
      result += htmlString.slice(currentIndex);
      break;
    }
    // Append the content before the comment
    result += htmlString.slice(currentIndex, commentStart);
    // Find the closing comment tag
    const commentEnd = htmlString.indexOf("-->", commentStart);
    if (commentEnd === -1) {
      // Malformed comment; stop processing
      break;
    }
    // Move the index past the end of the comment
    currentIndex = commentEnd + 3;
  }

  return result;
}

module.exports = removeHtmlComments;