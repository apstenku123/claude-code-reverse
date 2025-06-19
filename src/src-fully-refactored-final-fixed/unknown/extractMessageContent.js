/**
 * Extracts the textual content from a message object.
 *
 * If the message content is a string, isBlobOrFileLikeObject returns isBlobOrFileLikeObject directly.
 * If the message content is an array (e.g., representing rich text or segmented content),
 * isBlobOrFileLikeObject concatenates all segments of type 'text' and returns the resulting string.
 *
 * @param {Object} messageWrapper - An object containing a message with a 'content' property.
 * @param {Object} messageWrapper.message - The message object.
 * @param {string|Array} messageWrapper.message.content - The content of the message, either a string or an array of content segments.
 * @returns {string} The extracted textual content from the message.
 */
function extractMessageContent(messageWrapper) {
  // If the content is a simple string, return isBlobOrFileLikeObject directly
  if (typeof messageWrapper.message.content === "string") {
    return messageWrapper.message.content;
  }

  // Otherwise, assume content is an array of segments; extract and concatenate all text segments
  return messageWrapper.message.content
    .map(segment => segment.type === "text" ? segment.text : "")
    .join("");
}

module.exports = extractMessageContent;