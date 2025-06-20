/**
 * Extracts the content of <script> or <textarea> tags from the given HTML string,
 * processes special characters if present, and invokes a handler with the content.
 *
 * @param {string} htmlString - The full HTML string to search within.
 * @param {number} startIndex - The index in htmlString where the tag starts (after '<').
 * @param {string} tagName - The tag name to extract content for (e.g., 'script', 'textarea').
 * @param {function} decodeHtmlEntity - Function to decode HTML entities (used in replacement).
 * @param {object} handler - Object with a 'characters' method to handle the extracted content.
 * @returns {number} - The index after the closing tag if content was handled, otherwise startIndex + 1.
 */
function extractAndHandleScriptOrTextareaContent(htmlString, startIndex, tagName, decodeHtmlEntity, handler) {
  // Check if the tag is either <script> or <textarea> (case-insensitive)
  if (/^(?:script|textarea)$/i.test(tagName)) {
    // Find the index of the closing tag (e.g., </script> or </textarea>)
    const closingTagIndex = htmlString.indexOf(`</${tagName}>`, startIndex);
    // Extract the content between the opening and closing tag
    const tagContent = htmlString.substring(startIndex + 1, closingTagIndex);
    // If the content contains special HTML characters
    if (/[&<]/.test(tagContent)) {
      // If isBlobOrFileLikeObject'createInteractionAccessor a <script> tag, pass the content directly to the handler
      if (/^script$/i.test(tagName)) {
        handler.characters(tagContent, 0, tagContent.length);
        return closingTagIndex;
      }
      // For <textarea>, decode HTML entities before passing to the handler
      const decodedContent = tagContent.replace(/&#?\w+;/g, decodeHtmlEntity);
      handler.characters(decodedContent, 0, decodedContent.length);
      return closingTagIndex;
    }
  }
  // If not a <script> or <textarea> tag, or no special characters, move to the next character
  return startIndex + 1;
}

module.exports = extractAndHandleScriptOrTextareaContent;