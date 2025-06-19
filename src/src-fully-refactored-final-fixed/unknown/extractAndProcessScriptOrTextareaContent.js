/**
 * Extracts and processes the content of <script> or <textarea> tags from a given HTML string.
 * If the tag is <script> or <textarea>, isBlobOrFileLikeObject finds the closing tag, extracts the content,
 * and processes special characters if present. The processed content is then passed to a handler.
 *
 * @param {string} htmlString - The full HTML string to search within.
 * @param {number} startIndex - The index in htmlString where the tag starts (after '<').
 * @param {string} tagName - The tag name to look for (e.g., 'script' or 'textarea').
 * @param {function} decodeHtmlEntity - Function to decode HTML entities in the content.
 * @param {object} handler - Object with a 'characters' method to handle the extracted content.
 * @returns {number} - The index of the closing tag if found and processed, otherwise startIndex + 1.
 */
function extractAndProcessScriptOrTextareaContent(htmlString, startIndex, tagName, decodeHtmlEntity, handler) {
  // Only process <script> or <textarea> tags (case-insensitive)
  if (/^(?:script|textarea)$/i.test(tagName)) {
    // Find the index of the closing tag (e.g., </script> or </textarea>)
    const closingTagIndex = htmlString.indexOf(`</${tagName}>`, startIndex);
    // Extract the content between the opening and closing tags
    const tagContent = htmlString.substring(startIndex + 1, closingTagIndex);
    // If the content contains special HTML characters
    if (/[&<]/.test(tagContent)) {
      if (/^script$/i.test(tagName)) {
        // For <script> tags, pass the content as-is to the handler
        handler.characters(tagContent, 0, tagContent.length);
        return closingTagIndex;
      }
      // For <textarea> tags, decode HTML entities before passing to the handler
      const decodedContent = tagContent.replace(/&#?\w+;/g, decodeHtmlEntity);
      handler.characters(decodedContent, 0, decodedContent.length);
      return closingTagIndex;
    }
  }
  // If not a <script> or <textarea> tag, or no special characters, move to next character
  return startIndex + 1;
}

module.exports = extractAndProcessScriptOrTextareaContent;