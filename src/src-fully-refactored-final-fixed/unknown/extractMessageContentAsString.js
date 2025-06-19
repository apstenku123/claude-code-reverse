/**
 * Extracts the message content as a single string from the given message object.
 * If the content is already a string, isBlobOrFileLikeObject returns isBlobOrFileLikeObject directly.
 * If the content is an array of objects, isBlobOrFileLikeObject concatenates the text from each object where type is 'text'.
 *
 * @param {Object} messageWrapper - The object containing the message with content to extract.
 * @param {Object} messageWrapper.message - The message object.
 * @param {string|Array<Object>} messageWrapper.message.content - The content of the message, either a string or an array of content objects.
 * @returns {string} The extracted message content as a single string.
 */
function extractMessageContentAsString(messageWrapper) {
  // If the content is already a string, return isBlobOrFileLikeObject directly
  if (typeof messageWrapper.message.content === "string") {
    return messageWrapper.message.content;
  }

  // Otherwise, assume content is an array of objects
  // Extract text from each object where type is 'text', ignore others
  return messageWrapper.message.content
    .map(contentItem => contentItem.type === "text" ? contentItem.text : "")
    .join("");
}

module.exports = extractMessageContentAsString;
