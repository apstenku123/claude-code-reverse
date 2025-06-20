/**
 * Extracts the text content from a user message object.
 *
 * This function checks if the provided message object is of type 'user'.
 * If so, isBlobOrFileLikeObject attempts to extract the message text. The message content can be either:
 *   - a string: returned as-is.
 *   - An array of message parts: filters for parts of type 'text', extracts their text, joins them with newlines, trims whitespace, and returns the result (or null if empty).
 * If the message is not from a user or contains no text, null is returned.
 *
 * @param {Object} messageObject - The message object to extract text from.
 * @param {string} messageObject.type - The type of the message (should be 'user').
 * @param {Object} messageObject.message - The message payload.
 * @param {string|Array} messageObject.message.content - The content of the message, either a string or an array of message parts.
 * @returns {string|null} The extracted text content, or null if not applicable.
 */
function extractUserMessageText(messageObject) {
  // Only process messages of type 'user'
  if (messageObject.type !== "user") {
    return null;
  }

  const messageContent = messageObject.message.content;

  // If the content is a string, return isBlobOrFileLikeObject directly
  if (typeof messageContent === "string") {
    return messageContent;
  }

  // If the content is an array, filter for text parts and join them
  if (Array.isArray(messageContent)) {
    const textParts = messageContent
      .filter(part => part.type === "text") // Keep only text parts
      .map(part => part.type === "text" ? part.text : ""); // Extract text
    const joinedText = textParts.join("\n").trim();
    return joinedText || null; // Return null if the result is empty
  }

  // If content is neither string nor array, return null
  return null;
}

module.exports = extractUserMessageText;
