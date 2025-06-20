/**
 * Extracts and processes the content of <script> or <textarea> tags from a given HTML string.
 * If the tag is <script> or <textarea> and its content contains special characters (& or <),
 * the content is passed to a handler. For <script>, the content is passed as-is; for <textarea>,
 * HTML entities are decoded before passing to the handler.
 *
 * @param {string} htmlString - The full HTML string to search within.
 * @param {number} startIndex - The index to start searching for the closing tag.
 * @param {string} tagName - The tag name to look for (e.g., 'script' or 'textarea').
 * @param {function} decodeHtmlEntity - Function to decode HTML entities in the tag content.
 * @param {object} handler - Handler object with a 'characters' method to process tag content.
 * @returns {number} The index of the closing tag if found and processed, otherwise startIndex + 1.
 */
function extractAndHandleSpecialTagContent(htmlString, startIndex, tagName, decodeHtmlEntity, handler) {
  // Only process <script> or <textarea> tags (case-insensitive)
  if (/^(?:script|textarea)$/i.test(tagName)) {
    // Find the index of the corresponding closing tag
    const closingTagIndex = htmlString.indexOf(`</${tagName}>`, startIndex);
    // Extract the content between the opening and closing tag
    const tagContent = htmlString.substring(startIndex + 1, closingTagIndex);

    // If the content contains '&' or '<', further processing is needed
    if (/[&<]/.test(tagContent)) {
      if (/^script$/i.test(tagName)) {
        // For <script>, pass the content as-is to the handler
        handler.characters(tagContent, 0, tagContent.length);
        return closingTagIndex;
      }
      // For <textarea>, decode HTML entities before passing to the handler
      const decodedContent = tagContent.replace(/&#?\w+;/g, decodeHtmlEntity);
      handler.characters(decodedContent, 0, decodedContent.length);
      return closingTagIndex;
    }
  }
  // If not a special tag or no special characters, move to the next character
  return startIndex + 1;
}

module.exports = extractAndHandleSpecialTagContent;