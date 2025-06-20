/**
 * Replaces the first character of every closing tag matching the specified tag name in the input HTML string with the HTML entity '&lt;'.
 *
 * @param {string} htmlString - The HTML string to process.
 * @param {string} tagName - The tag name whose closing tags should be replaced (e.g., 'div', 'span').
 * @returns {string} The modified HTML string with matching closing tags' '<' replaced by '&lt;'.
 */
function replaceClosingTagWithEntity(htmlString, tagName) {
  // Construct the closing tag string (e.g., '</div')
  const closingTagStart = `</${tagName}`;

  // If the HTML string does not contain the closing tag (case-insensitive), return as is
  if (!htmlString.toLowerCase().includes(closingTagStart)) {
    return htmlString;
  }

  // Convert the HTML string into an array of characters for in-place modification
  const htmlChars = [...htmlString];

  // Create a global, case-insensitive regex to find all occurrences of the closing tag
  const closingTagRegex = new RegExp(closingTagStart, 'ig');
  const matchesIterator = htmlString.matchAll(closingTagRegex);

  // For each match, replace the first character of the closing tag ('<') with '&lt;'
  for (const match of matchesIterator) {
    if (typeof match.index === 'number') {
      htmlChars[match.index] = '&lt;';
    }
  }

  // Join the array back into a string and return
  return htmlChars.join("");
}

module.exports = replaceClosingTagWithEntity;