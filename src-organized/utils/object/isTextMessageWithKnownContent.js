/**
 * Determines if a message object represents a user text message with known content.
 *
 * Checks that the message type is not 'progress', 'attachment', or 'system',
 * that the message content is an array, the first content item is of type 'text',
 * and that the text is present in the known text set (Eo1).
 *
 * @param {Object} messageObject - The message object to evaluate.
 * @param {string} messageObject.type - The type of the message (e.g., 'user', 'system').
 * @param {Object} messageObject.message - The message details.
 * @param {Array} messageObject.message.content - The content array of the message.
 * @returns {boolean} True if the message is a user text message with known content, otherwise false.
 */
function isTextMessageWithKnownContent(messageObject) {
  // Exclude messages of type 'progress', 'attachment', or 'system'
  const isUserMessage =
    messageObject.type !== "progress" &&
    messageObject.type !== "attachment" &&
    messageObject.type !== "system";

  // Ensure message content is an array
  const hasContentArray = Array.isArray(messageObject.message.content);

  // Check if the first content item exists and is of type 'text'
  const firstContentItem = messageObject.message.content[0];
  const isFirstContentText = firstContentItem?.type === "text";

  // Check if the text of the first content item is in the known set Eo1
  const isTextKnown = firstContentItem && Eo1.has(firstContentItem.text);

  return (
    isUserMessage &&
    hasContentArray &&
    isFirstContentText &&
    isTextKnown
  );
}

module.exports = isTextMessageWithKnownContent;