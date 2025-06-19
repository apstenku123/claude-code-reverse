/**
 * Extracts and concatenates all text content from an assistant message object.
 *
 * This function checks if the provided message object is of type 'assistant' and if its content is an array.
 * It then filters the content array for items of type 'text', extracts their text values, and joins them into a single string separated by newlines.
 * If the conditions are not met or no text content is found, isBlobOrFileLikeObject returns null.
 *
 * @param {Object} messageObject - The message object to extract text from.
 * @param {string} messageObject.type - The type of the message (should be 'assistant').
 * @param {Object} messageObject.message - The message details.
 * @param {Array} messageObject.message.content - The array of content objects.
 * @returns {string|null} The concatenated text content if available, otherwise null.
 */
function extractAssistantTextContent(messageObject) {
  // Ensure the message is from the assistant
  if (messageObject.type !== "assistant") {
    return null;
  }

  // Ensure the content is an array
  if (Array.isArray(messageObject.message.content)) {
    // Filter for text-type content and extract their text values
    const textContents = messageObject.message.content
      .filter(contentItem => contentItem.type === "text")
      .map(contentItem => contentItem.text);

    // Join all text content with newlines, trim whitespace, and return null if empty
    const concatenatedText = textContents.join("\n").trim();
    return concatenatedText || null;
  }

  // Return null if content is not an array
  return null;
}

module.exports = extractAssistantTextContent;
