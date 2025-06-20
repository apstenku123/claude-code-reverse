/**
 * Checks if a message object represents a valid user text message content.
 *
 * The function returns true if all of the following are true:
 *   - The message type is not 'progress', 'attachment', or 'system'
 *   - The message content is an array
 *   - The first element of the content array is an object with type 'text'
 *   - The text of the first content element exists in the Eo1 set
 *
 * @param {Object} messageObject - The message object to validate.
 * @param {string} messageObject.type - The type of the message (e.g., 'user', 'system', etc.).
 * @param {Object} messageObject.message - The message payload.
 * @param {Array} messageObject.message.content - The content array of the message.
 * @returns {boolean} True if the message object is a valid user text message content, otherwise false.
 */
function isValidTextMessageContent(messageObject) {
  // Check if the message type is not one of the excluded types
  const isNotExcludedType = (
    messageObject.type !== "progress" &&
    messageObject.type !== "attachment" &&
    messageObject.type !== "system"
  );

  // Check if the message content is an array
  const isContentArray = Array.isArray(messageObject.message.content);

  // Check if the first content element exists and is of type 'text'
  const firstContent = messageObject.message.content[0];
  const isFirstContentText = firstContent?.type === "text";

  // Check if the text of the first content element exists in the Eo1 set
  // (Assumes Eo1 is a Set of valid text strings, defined elsewhere in the module)
  const isTextInSet = isFirstContentText && Eo1.has(firstContent.text);

  // Return true only if all conditions are met
  return isNotExcludedType && isContentArray && isTextInSet;
}

module.exports = isValidTextMessageContent;