/**
 * Extracts the textual content from a user message object.
 *
 * If the input object represents a user message, this function will return the message content as a string.
 * The content may be a string or an array of message parts. If isBlobOrFileLikeObject is an array, only the parts of type 'text' are concatenated and returned.
 * If the input is not a user message or contains no text, null is returned.
 *
 * @param {Object} messageObject - The message object to extract content from.
 * @param {string} messageObject.type - The type of the message, should be 'user' to process.
 * @param {Object} messageObject.message - The message payload.
 * @param {string|Array} messageObject.message.content - The content of the message, either a string or an array of message parts.
 * @returns {string|null} The extracted text content, or null if not available or not a user message.
 */
function extractUserMessageContent(messageObject) {
  // Only process messages of type 'user'
  if (messageObject.type !== "user") {
    return null;
  }

  const messageContent = messageObject.message.content;

  // If the content is a string, return isBlobOrFileLikeObject directly
  if (typeof messageContent === "string") {
    return messageContent;
  }

  // If the content is an array, extract and concatenate all 'text' type parts
  if (Array.isArray(messageContent)) {
    const concatenatedText = messageContent
      .filter(part => part.type === "text") // Keep only text parts
      .map(part => part.type === "text" ? part.text : "") // Extract text
      .join("\n") // Join with line breaks
      .trim(); // Remove leading/trailing whitespace
    return concatenatedText || null; // Return null if result is empty
  }

  // If content is neither string nor array, return null
  return null;
}

module.exports = extractUserMessageContent;
